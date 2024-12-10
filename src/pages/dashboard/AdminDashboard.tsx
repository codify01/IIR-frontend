import React from "react";
import CardSeven from "../../components/card/Cardseven";

const AdminDashboard: React.FC = () => {
  return (
    <div className="mx-auto space-y-10">
      {/* Dashboard Overview */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <CardSeven redirect="/admin/manageinvestors" balType="Total Investors" amount={100} cta="View" />
        <CardSeven redirect="/admin/manageinvestments" balType="Available Investments" amount={20} cta="View" />
        <CardSeven redirect="/admin/approvekyc" balType="Pending KYC" amount={8} cta="View" />
        <CardSeven redirect="/admin/managetransactions" balType="Pending Transactions" amount={15} cta="View" />
      </div>

      {/* Insights Section */}
      {/* <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Quick Insights</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-500">₦5,000,000</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">Active Users</h3>
            <p className="text-2xl font-bold text-blue-500">250</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">Completed Transactions</h3>
            <p className="text-2xl font-bold text-green-500">350</p>
          </div>
        </div>
      </div> */}

      {/* Analytics Section */}
      {/* <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Analytics</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-500">Chart or Analytics Data Placeholder</p>
        </div>
      </div> */}

      {/* Recent Activities Section */}
      {/* <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Recent Activities</h2>
        <ul className="bg-white shadow-md rounded-lg p-6 divide-y divide-gray-200">
          <li className="py-4 flex justify-between">
            <span>User A approved KYC</span>
            <span className="text-gray-500 text-sm">5 mins ago</span>
          </li>
          <li className="py-4 flex justify-between">
            <span>User B created an investment</span>
            <span className="text-gray-500 text-sm">10 mins ago</span>
          </li>
          <li className="py-4 flex justify-between">
            <span>Admin updated an investment plan</span>
            <span className="text-gray-500 text-sm">1 hour ago</span>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
