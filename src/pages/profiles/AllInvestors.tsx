import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  email: string;
  kyc: boolean;
}

const AllInvestors: React.FC = () => {
  const location = useLocation();
  const isProfileRoute = location.pathname.includes('/admin/manageinvestors/');

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API with Authorization
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get token from localStorage (or wherever it's stored)
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authorization token found.');
        return;
      }

      // Make the API request with Authorization header
      const response = await axios.get(`${apiURL}/allUsers.php`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  return (
    <div className="flex lg:flex-row flex-col gap-6 relative">
      <div className="thissss relative overflow-x-auto overflow-y-auto lg:w-2/3 lg:mb-0 mb-10 w-full lg:max-h-[85.5vh] max-h-[100vh] text-xs bg-pry p-2 text-sec rounded-md shadow-lg shadow-tet/30">
        <table className="whitespace-nowrap w-full text-center">
          <thead>
            <tr className="border-b-2 border-sec/20">
              <th scope="col" className="py-4">S/N</th>
              <th scope="col" className="py-4">Email address</th>
              <th scope="col" className="py-4">KYC</th>
              <th scope="col" className="py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-10">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-red-500">{error}</td>
              </tr>
            ) : users.length > 0 ? (
              users.map(({ id, email, kyc }, index) => (
                <tr key={id} className="border-b border-sec/20">
                  <td className="font-medium">{index + 1}</td>
                  <td className="font-medium">{email}</td>
                  <td className="font-medium">{kyc ? 'Verified' : 'Not verified'}</td>
                  <td className="font-medium">
                    <Link to={`/admin/manageinvestors/${id}`}>
                      <button className="bg-sec text-tet p-3 rounded-lg shadow-lg shadow-tet/30">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-sec/20">
                <td colSpan={4} className="font-bold text-2xl py-10">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`lg:w-1/2 lg:sticky w-full h-full fixed top-0 right-0 flex justify-center lg:p-0 md:p-5 p-4 items-center 
        ${isProfileRoute ? 'lg:bg-transparent bg-pry/50 z-10' : 'bg-transparent -z-10'}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AllInvestors;
