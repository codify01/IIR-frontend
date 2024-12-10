import React from "react";
import CardSeven from "../../components/card/Cardseven";

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="mx-auto p-6 space-y-10">
      {/* Dashboard Overview */}
      <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <CardSeven redirect="/superadmin/manageadmins" balType="Total Admins" amount={10} cta="Manage" />
        <CardSeven redirect="/superadmin/manageusers" balType="Total Users" amount={500} cta="Manage" />
        <CardSeven redirect="/superadmin/revenue" balType="Total Revenue" amount={2000000} cta="View" />
        <CardSeven redirect="/superadmin/analytics" balType="System Analytics" amount={0} cta="View" />
      </div>

      {/* Insights Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Key Metrics</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">New Users (This Month)</h3>
            <p className="text-2xl font-bold text-blue-500">150</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">Pending KYC Approvals</h3>
            <p className="text-2xl font-bold text-yellow-500">25</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-600">Failed Transactions</h3>
            <p className="text-2xl font-bold text-red-500">5</p>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Analytics</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-500">Advanced analytics and system-wide performance trends will go here.</p>
          {/* Placeholder for charts or graphs */}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Critical Notifications</h2>
        <ul className="bg-white shadow-md rounded-lg p-6 divide-y divide-gray-200">
          <li className="py-4 flex justify-between">
            <span>Server downtime reported</span>
            <span className="text-gray-500 text-sm">5 mins ago</span>
          </li>
          <li className="py-4 flex justify-between">
            <span>Unresolved KYC request from User A</span>
            <span className="text-gray-500 text-sm">10 mins ago</span>
          </li>
          <li className="py-4 flex justify-between">
            <span>High volume of failed transactions</span>
            <span className="text-gray-500 text-sm">1 hour ago</span>
          </li>
        </ul>
      </div>

      {/* Manage Permissions Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Permissions</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-500">Dynamic role management tools will go here.</p>
          {/* Placeholder for role/permission management */}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
