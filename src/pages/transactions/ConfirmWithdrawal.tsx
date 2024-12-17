import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

const ConfirmWithdrawal: React.FC = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const getWithdrawalRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiURL}/allUsersWithdraw.php`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
        });
        setWithdrawalRequests(response.data);
        setError("");
      } catch (err: any) {
        setError("Failed to fetch withdrawal requests. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getWithdrawalRequests();
  }, []);

  const formatAccountBalance = (amount: number) => `NGN ${amount.toLocaleString("en-NG")}`;

  const handleActionLoading = (transactionId: string, isLoading: boolean) => {
    setActionLoading((prev) => ({ ...prev, [transactionId]: isLoading }));
  };

  const handleConfirm = async (transactionId: string) => {
    handleActionLoading(transactionId, true);
    try {
      const response = await axios.get(`${apiURL}/adminUpdatewithdraw.php?withdrawalId=${transactionId}&action=approve`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        // params: { withdrawalId: transactionId },
      });
      if (response.status === 200) {
        setWithdrawalRequests((prevState) =>
          prevState.map((request) =>
            request.trnxId === transactionId
              ? { ...request, status: "confirmed" }
              : request
          )
        );
        setError("");
      } else {
        setError("Failed to confirm the withdrawal.");
      }
    } catch (err: any) {
      setError("An error occurred while confirming the withdrawal.");
      console.error(err);
    } finally {
      handleActionLoading(transactionId, false);
      location.reload()
    }
  };

  const handleCancel = async (transactionId: string) => {
    handleActionLoading(transactionId, true);
    try {
      const response = await axios.get(`${apiURL}/adminUpdatewithdraw.php?withdrawalId=${transactionId}&action=reject`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        // params: { withdrawalId: transactionId },
      });
      console.log(response);
      
      if (response.data.status === 200) {
        setWithdrawalRequests((prevState) =>
          prevState.map((request) =>
            request.trnxId === transactionId
              ? { ...request, status: "confirmed" }
              : request
          )
        );
        setError("");
      } else {
        setError("Failed to cancel the withdrawal.");
      }
    } catch (err: any) {
      setError("An error occurred while canceling the withdrawal.");
      console.error(err);
    } finally {
      handleActionLoading(transactionId, false);
      location.reload()
    }
  };

  return (
    <div className="relative overflow-x-auto w-full max-h-[70vh] bg-white text-sm rounded-lg shadow-md">
      {loading ? (
        <div className="text-center py-10">Loading withdrawal requests...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : (
        <table className="table-auto w-full text-center">
          <thead className="sticky top-0 bg-pry text-white shadow">
            <tr>
              <th className="px-4 py-3">S/N</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Account Number</th>
              <th className="px-4 py-3">Account Name</th>
              <th className="px-4 py-3">Bank Name</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 capitalize">
            {withdrawalRequests.length > 0 ? (
              withdrawalRequests.map(
                ({ id, amount, account_number, account_name, bank_name, status }, index) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{id}</td>
                    <td className="px-4 py-2">{formatAccountBalance(amount)}</td>
                    <td className="px-4 py-2">{account_number}</td>
                    <td className="px-4 py-2">{account_name}</td>
                    <td className="px-4 py-2">{bank_name}</td>
                    <td className="px-4 py-2 flex justify-center gap-4">
                      {status === "pending" ? (
                        <>
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => handleConfirm(id)}
                            title="Confirm Payment"
                            disabled={actionLoading[id]}
                          >
                            {actionLoading[id] ? (
                              <FaSpinner className="h-6 w-6 animate-spin" />
                            ) : (
                              <FaCheckCircle className="h-6 w-6" />
                            )}
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleCancel(id)}
                            title="Cancel Transaction"
                            disabled={actionLoading[id]}
                          >
                            {actionLoading[id] ? (
                              <FaSpinner className="h-6 w-6 animate-spin" />
                            ) : (
                              <FaTimesCircle className="h-6 w-6" />
                            )}
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded text-white ${
                            status === "approved" ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  No Pending Withdrawal Requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConfirmWithdrawal;
