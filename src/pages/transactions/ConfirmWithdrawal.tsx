import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios

// The API endpoint URL (replace with your actual API endpoint)
const apiURL = import.meta.env.VITE_API_URL;

const ConfirmWithdrawal: React.FC = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState<any[]>([]); // State to store withdrawal requests
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch withdrawal requests on component mount
  useEffect(() => {
    const getWithdrawalRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiURL}/allUsersWithdraw.php`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "", // Assuming token is stored in localStorage
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

  const formatAccountBalance = (amount: number) => {
    return `NGN ${amount.toLocaleString("en-NG")}`;
  };

  const handleConfirm = async (transactionId: string) => {
    try {
      const response = await axios.get(
        `${apiURL}/adminUpdatewithdraw.php`, // Endpoint for confirming withdrawal
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          params: {
            withdrawalId: transactionId,
          },
        }
      );
      if (response.status === 200) {
        // Update the state to reflect the confirmed withdrawal
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
    }
  };

  const handleCancel = async (transactionId: string) => {
    try {
      const response = await axios.delete(
        `${apiURL}/adminCancelWithdrawal.php`, // Endpoint for canceling withdrawal
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          params: {
            transaction_id: transactionId,
          },
        }
      );
      if (response.data.status === "success") {
        // Update the state to reflect the canceled withdrawal
        setWithdrawalRequests((prevState) =>
          prevState.map((request) =>
            request.trnxId === transactionId
              ? { ...request, status: "canceled" }
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
    }
  };

  return (
    <div className="thissss relative overflow-x-auto w-full max-h-[85.5vh] text-xs bg-pry p-2 text-sec rounded-md shadow-lg shadow-tet/30">
      {loading ? (
        <div className="text-center py-10">Loading withdrawal requests...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : (
        <table className="whitespace-nowrap w-full text-center">
          <thead>
            <tr className="border-b-2 border-sec/20">
              <th scope="col" className="py-4">S/N</th>
              <th scope="col" className="py-4">Transaction ID</th>
              <th scope="col" className="py-4">Amount</th>
              <th scope="col" className="py-4">Account Number</th>
              <th scope="col" className="py-4">Account Name</th>
              <th scope="col" className="py-4">Bank Name</th>
              <th scope="col" className="py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalRequests.length > 0 ? (
              withdrawalRequests.map(
                ({ id, amount, account_number, account_name, bank_name, status }, index) => (
                  <tr key={id} className="border-b border-sec/20">
                    <td className="font-medium">{index + 1}</td>
                    <td className="font-medium">{id}</td>
                    <td className="font-medium">{formatAccountBalance(amount)}</td>
                    <td className="font-medium">{account_number}</td>
                    <td className="font-medium">{account_name}</td>
                    <td className="font-medium">{bank_name}</td>
                    <td className="font-medium space-y-3 grid">
                      {status === "pending" && (
                        <>
                          <button
                            className="bg-sec text-tet p-3 rounded-lg shadow-lg shadow-tet/30 w-3/4 mx-auto"
                            onClick={() => handleConfirm(id)}
                          >
                            Confirm Payment
                          </button>
                          <button
                            className="bg-red-600 text-sec p-3 rounded-lg shadow-lg shadow-tet/30 w-3/4 mx-auto"
                            onClick={() => handleCancel(id)}
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
                <td colSpan={7} className="text-center text-3xl font-semibold py-10">
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
