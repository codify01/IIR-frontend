import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
// import img13 from "../../assets/image/img13.jfif";
// import img14 from "../../assets/image/img14.png";

// The API endpoint URL (replace with your actual API endpoint)
const apiURL = import.meta.env.VITE_API_URL;

const ConfirmDeposit: React.FC = () => {
  const [depositRequests, setDepositRequests] = useState<any[]>([]); // State to store deposit requests
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch deposit requests on component mount
  useEffect(() => {
    const getDepositRequests = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const response = await axios.get(`${apiURL}/alldeposit.php`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
        });
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

  const formatAccountBalance = (amount: string) => {
    return `NGN ${parseFloat(amount).toLocaleString("en-NG")}`;
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleConfirm = async (transactionId: string) => {
    try {
      const response = await axios.get(
        `${apiURL}/adminVerifyDeposit.php`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          params: {
            deposit_id: transactionId,
          },
        }
      )
      console.log(response);
      
      if (response.status == 200) {
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
    }
  };

  const handleCancel = async (transactionId: string) => {
    try {
      const response = await axios.delete(
        `${apiURL}/adminDeleteDeposit.php`, // Send the transaction_id in the URL or params
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          params: {
            deposit_id: transactionId,
          },
        }
      );
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
    }
  };

  return (
    <React.Fragment>
      <div className="thissss relative overflow-x-auto w-full max-h-[85.5vh] text-xs bg-pry p-2 text-sec rounded-md shadow-lg shadow-tet/30">
        {loading ? (
          <div className="text-center py-10">Loading deposit requests...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : (
          <table className="whitespace-nowrap w-full text-center">
            <thead>
              <tr className="border-b-2 border-sec/20">
                <th scope="col" className="py-4">
                  S/N
                </th>
                <th scope="col" className="py-4">
                  Transaction ID
                </th>
                <th scope="col" className="py-4">
                  Amount
                </th>
                <th scope="col" className="py-4">
                  Proof Of Payment
                </th>
                <th scope="col" className="py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {depositRequests.length > 0 ? (
                depositRequests.map(
                  ({ transaction_id, amount, proof_of_payment, status }, index) => (
                    <tr key={index} className="border-b border-sec/20">
                      <td className="font-medium">{index + 1}</td>
                      <td className="font-medium">{transaction_id}</td>
                      <td className="font-medium">{formatAccountBalance(amount)}</td>
                      <td className="font-medium w-1/5">
                        <img
                          src={`${apiURL}/${proof_of_payment}`}
                          className="mx-auto h-[100px]"
                          alt={`proof of pay for ${transaction_id}`}
                          onClick={() => openModal(proof_of_payment)}
                        />
                      </td>
                      <td className="font-medium space-y-3 grid">
                        {status === "pending" && (
                          <>
                            <button
                              className="bg-sec text-tet p-3 rounded-lg shadow-lg shadow-tet/30 w-3/4 mx-auto"
                              onClick={() => handleConfirm(transaction_id)} // Pass transaction_id
                            >
                              Confirm Payment
                            </button>
                            <button
                              className="bg-red-600 text-sec p-3 rounded-lg shadow-lg shadow-tet/30 w-3/4 mx-auto"
                              onClick={() => handleCancel(transaction_id)} // Pass transaction_id
                            >
                              Cancel Transaction
                            </button>
                          </>
                        )}
                        {status !== "pending" && (
                          <span className="text-white p-3 bg-green-700 rounded-lg w-3/4 mx-auto">
                            Transaction {status}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr className="border-b border-sec/20">
                  <td colSpan={5} className="text-center text-3xl font-semibold py-10">
                    No Pending Deposit Requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-pry/55 py-10 flex justify-center items-center z-50 px-4">
          <div className="bg-sec p-5 rounded-md shadow-lg md:w-1/2 w-full text-center">
            <h3 className="text-3xl text-pry font-bold">Proof Of Payment</h3>
            <div className="w-3/5 mx-auto">
              <img src={`${apiURL}/${selectedImage}`} alt="Selected Document" className="w-full h-full rounded-md" />
            </div>
            <button
              className="mt-4 w-1/2 bg-pry/55 text-tet font-bold shadow-lg shadow-tet/20 px-4 py-2 rounded-md transition"
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
