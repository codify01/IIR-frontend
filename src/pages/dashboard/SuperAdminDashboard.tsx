import React, { useEffect, useState } from "react";
import CardSeven from "../../components/card/Cardseven";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

// Define analytics type
interface AnalyticsData {
  total_admins: number;
  total_general_users: number;
  total_deposited_money: number;
  total_users_current_month: number;
  pending_kyc: number;
  total_failed_transaction: number;
}

const SuperAdminDashboard: React.FC = () => {
  const token = localStorage.getItem("token");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  // Utility function to format revenue
  const formatRevenue = (amount: number | undefined): string => {
    if (!amount) return "0";
    if (amount >= 1e9) return `${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `${(amount / 1e6).toFixed(2)}M`;
    return amount.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(`${apiURL}/superAdminAnalytics.php`, {
          headers: { Authorization: token },
        });

        if (response.data) {
          setAnalytics(response.data);
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="mx-auto p-6 space-y-10">
      {/* Dashboard Overview */}
      <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <CardSeven
          redirect="/superadmin/manageadmins"
          balType="Total Admins"
          amount={analytics?.total_admins ?? 0}
          cta="Manage"
        />
        <CardSeven
          redirect="/superadmin/manageusers"
          balType="Total Users"
          amount={analytics?.total_general_users ?? 0}
          cta="Manage"
        />
        <CardSeven
          redirect="/superadmin/revenue"
          balType="Total Revenue"
          amount={formatRevenue(analytics?.total_deposited_money)}
          cta="View"
        />
        <CardSeven
          redirect="/superadmin/analytics"
          balType="System Analytics"
          amount={0}
          cta="View"
        />
      </div>

      {/* Insights Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Key Metrics</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">
              New Users (This Month)
            </h3>
            <p className="text-2xl font-bold text-blue-500">
              {analytics?.total_users_current_month ?? 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">
              Pending KYC Approvals
            </h3>
            <p className="text-2xl font-bold text-yellow-500">
              {analytics?.pending_kyc ?? 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">
              Failed Transactions
            </h3>
            <p className="text-2xl font-bold text-red-500">
              {analytics?.total_failed_transaction ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
