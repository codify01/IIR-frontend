import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaExpand, FaSpinner } from "react-icons/fa";
import img13 from "../../assets/image/img13.jfif";
import img14 from "../../assets/image/img14.png";

const ApproveKyc: React.FC = () => {
  const depositRequests: { email: string; id1: string; id2: string; id3: string }[] = [
    {
      email: "adelekeoluwamayokun27@gmail.com",
      id1: img13,
      id2: img14,
      id3: img13,
    },
    {
      email: "adelekeoluwamayokun27@gmail.com",
      id1: img14,
      id2: img13,
      id3: img14,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleActionLoading = (email: string, isLoading: boolean) => {
    setActionLoading((prev) => ({ ...prev, [email]: isLoading }));
  };

  const handleAccept = async (email: string) => {
    handleActionLoading(email, true);
    try {
      // Simulate API call here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`KYC Approved for ${email}`);
    } catch (error) {
      console.error("Failed to approve KYC:", error);
    } finally {
      handleActionLoading(email, false);
    }
  };

  const handleReject = async (email: string) => {
    handleActionLoading(email, true);
    try {
      // Simulate API call here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`KYC Rejected for ${email}`);
    } catch (error) {
      console.error("Failed to reject KYC:", error);
    } finally {
      handleActionLoading(email, false);
    }
  };

  return (
    <div>
      {/* Table Section */}
      <div className="relative overflow-x-auto w-full max-h-[85vh] text-xs rounded-md shadow-lg shadow-tet/30">
        <table className="table-auto w-full text-center">
          <thead className="sticky top-0 bg-pry text-sec shadow">
            <tr className="border-b-2 border-sec/20">
              <th className="px-4 py-3">S/N</th>
              <th className="px-4 py-3">User Email</th>
              <th className="px-4 py-3">ID1</th>
              <th className="px-4 py-3">ID2</th>
              <th className="px-4 py-3">ID3</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sec/20">
            {depositRequests.length > 0 ? (
              depositRequests.map(({ email, id1, id2, id3 }, index) => (
                <tr key={index} className="hover:bg-pry/10">
                  <td className="px-4 py-2 font-medium">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{email}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(id1)}
                      title="View ID1"
                    >
                      <FaExpand className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(id2)}
                      title="View ID2"
                    >
                      <FaExpand className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(id3)}
                      title="View ID3"
                    >
                      <FaExpand className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2 space-y-2">
                    <button
                      className="flex items-center justify-center bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-md shadow-md w-full"
                      onClick={() => handleAccept(email)}
                      disabled={actionLoading[email]}
                      title="Accept KYC"
                    >
                      {actionLoading[email] ? (
                        <FaSpinner className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <FaCheckCircle className="mr-2" />
                          Accept
                        </>
                      )}
                    </button>
                    <button
                      className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md shadow-md w-full"
                      onClick={() => handleReject(email)}
                      disabled={actionLoading[email]}
                      title="Reject KYC"
                    >
                      {actionLoading[email] ? (
                        <FaSpinner className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <FaTimesCircle className="mr-2" />
                          Reject
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-2xl font-semibold">
                  No Pending KYC Validation!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-pry/60 flex justify-center items-center z-50 p-4">
          <div className="bg-sec p-5 rounded-lg shadow-lg text-center max-w-md w-full">
            <img
              src={selectedImage}
              alt="Selected Document"
              className="w-full h-auto rounded-md mb-4"
            />
            <button
              className="bg-pry text-tet font-semibold px-6 py-2 rounded-md shadow-md hover:bg-pry/80 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveKyc;
