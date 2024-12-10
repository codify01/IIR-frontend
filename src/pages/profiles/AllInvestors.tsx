import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const apiURL = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  email: string;
  kyc: boolean;
}

const AllInvestors: React.FC = () => {
  const location = useLocation();
  const isProfileRoute = location.pathname.includes("/admin/manageinvestors/");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        return;
      }

      const response = await axios.get(`${apiURL}/allUsers.php`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col gap-6 relative">
      {/* Table Section */}
      <div className="relative overflow-x-auto overflow-y-auto lg:w-2/3 w-full max-h-[85vh] bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-center">
          <thead className="sticky top-0 bg-pry text-white shadow-sm">
            <tr>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Email Address</th>
              <th className="px-4 py-2">KYC Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <AiOutlineLoading3Quarters className="text-gray-500 animate-spin h-6 w-6 mx-auto" />
                  <span className="block mt-2 text-sm text-gray-500">Loading users...</span>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-red-600">
                  {error}
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map(({ id, email, kyc }, index) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        kyc
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {kyc ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Link to={`/admin/manageinvestors/${id}`}>
                      <button
                        className="bg-pry text-white px-3 py-2 rounded-md flex items-center gap-2"
                        title="View Details"
                        aria-label={`View details of user ${email}`}
                      >
                        <FaUserEdit />
                        <span>Details</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <span className="text-gray-500">No users found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Outlet Section */}
      <div
        className={`lg:w-1/2 w-full h-full ${
          isProfileRoute ? "relative" : "hidden lg:block"
        }`}
      >
        <div
          className={`${
            isProfileRoute
              ? "bg-gray-50 p-4 rounded-lg shadow-md"
              : "bg-transparent"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AllInvestors;
