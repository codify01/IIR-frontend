import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaExpand, FaSpinner } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

const ConfirmDeposit: React.FC = () => {
  const [depositRequests, setDepositRequests] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getDepositRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiURL}/alldeposit.php`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
        });
        console.log(response);
        setDepositRequests(response.data);
        setError("");
      } catch (err: any) {
        setError("Failed to fetch deposit requests. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getDepositRequests();
  }, []);

  const formatAccountBalance = (amount: string) =>
    `NGN ${parseFloat(amount).toLocaleString("en-NG")}`;

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleActionLoading = (transactionId: string, isLoading: boolean) => {
    setActionLoading((prev) => ({ ...prev, [transactionId]: isLoading }));
  };

  const handleConfirm = async (transactionId: string) => {
    handleActionLoading(transactionId, true);
    try {
      const response = await axios.get(`${apiURL}/adminVerifyDeposit.php`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        params: { deposit_id: transactionId },
      });
      console.log(response);
      if (response.status === 200) {
        setDepositRequests((prevState) =>
          prevState.map((request) =>
            request.transaction_id === transactionId
              ? { ...request, status: "confirmed" }
              : request
          )
        );
        setError("");
      } else {
        setError("Failed to confirm the payment.");
      }
    } catch (err: any) {
      setError("An error occurred while confirming the payment.");
      console.error(err);
    } finally {
      handleActionLoading(transactionId, false);
    }
  };

  const handleCancel = async (transactionId: string) => {
    handleActionLoading(transactionId, true);
    try {
      const response = await axios.delete(`${apiURL}/adminDeleteDeposit.php`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        params: { deposit_id: transactionId },
      });

      if (response.data.status === "success") {
        setDepositRequests((prevState) =>
          prevState.map((request) =>
            request.transaction_id === transactionId
              ? { ...request, status: "canceled" }
              : request
          )
        );
        setError("");
      } else {
        setError("Failed to cancel the transaction.");
      }
    } catch (err: any) {
      setError("An error occurred while canceling the transaction.");
      console.error(err);
    } finally {
      handleActionLoading(transactionId, false);
    }
  };

  return (
    <React.Fragment>
      <div className="relative overflow-x-auto w-full max-h-[75vh] bg-white p- rounded-lg shadow-md">
        {loading ? (
          <div className="text-center py-10">Loading deposit requests...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : (
          <table className="table-auto w-full text-center">
            <thead className="sticky top-0 bg-pry text-white">
              <tr>
                <th className="px-4 py-3">S/N</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Proof Of Payment</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {depositRequests.length > 0 ? (
                depositRequests.map(
                  ({ transaction_id, amount, proof_of_payment, status,is_verified,is_processed,transactionId }, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{transactionId}</td>
                      <td className="px-4 py-2">{formatAccountBalance(amount)}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="View Proof"
                          onClick={() => openModal(proof_of_payment)}
                        >
                          <FaExpand className="h-5 w-5" />
                        </button>
                      </td>
                      <td className="px-4 py-2 flex justify-center gap-4">
                        {status === "pending" ? (
                          <>
                            <button
                              className="text-green-600 hover:text-green-800"
                              title="Confirm Payment"
                              onClick={() => handleConfirm(transaction_id)}
                              disabled={actionLoading[transaction_id]}
                            >
                              {actionLoading[transaction_id] ? (
                                <FaSpinner className="h-5 w-5 animate-spin" />
                              ) : (
                                <FaCheckCircle className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              title="Cancel Transaction"
                              onClick={() => handleCancel(transaction_id)}
                              disabled={actionLoading[transaction_id]}
                            >
                              {actionLoading[transaction_id] ? (
                                <FaSpinner className="h-5 w-5 animate-spin" />
                              ) : (
                                <FaTimesCircle className="h-5 w-5" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded text-white capitalize ${
                              is_verified && is_processed === 1 ? "bg-green-600" : is_verified === 1 ? "bg-yellow-600" : "bg-red-600"
                            }`}
                          >
                            {is_verified && is_processed === 1 ? "approved" : is_verified === 1 ? "not processed" : "Cancelled"}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    No Pending Deposit Requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg max-w-lg w-full text-center">
            <h3 className="text-xl font-bold mb-4">Proof Of Payment</h3>
            <img
              src={`${apiURL}/${selectedImage}`}
              alt="Proof of Payment"
              className="w-full h-auto rounded"
            />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ConfirmDeposit;
