import React from "react";
import DashboardChart from "../../components/charts/AnalyticsChart";

const AdminDashboard: React.FC = () => {
  return (
    <div className="mx-auto space-y-10">
      {/* Dashboard Overview */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <DashboardChart/>

     
    </div>
  );
};

export default AdminDashboard;
