import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/home/Home';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Signup';
import GetStarted from './pages/view/Getstarted';
import Notfound from './pages/view/Notfound';

import MainLayout from './layout/MainLayout';
import Userdashboard from './pages/dashboard/Userdashboard';
import Investments from './pages/investment/Investments';
import TransactionHistory from './pages/transactions/TransactionHistory';
import DesktopUserProfile from './pages/dashboard/DesktopUserProfile';
// import Profile from './pages/dashboard/Profile';
import Withdraw from './pages/transactions/Withdraw';
import ManualDeposit from './pages/transactions/ManualDeposit';
import AutoDeposit from './pages/transactions/AutoDeposit';
import Confirminvestments from './pages/investment/Confirminvestment';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CreateInvestments from './pages/investment/Createinvestments';
import ManageInvestments from './pages/investment/Manageinvestment';
import AllInvestors from './pages/profiles/AllInvestors';
import InvestorProfile from './pages/profiles/Investorprofile';
import ConfirmDeposit from './pages/transactions/ConfirmDeposit';
import ConfirmWithdrawal from './pages/transactions/ConfirmWithdrawal';
import ManageTransactions from './pages/transactions/Managetransactions';
import ApproveKyc from './pages/KYC/ApproveKyc';
import ManageAdmins from './pages/profiles/ManageAdmins';
import AdminProfile from './pages/profiles/AdminProfile';

import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute
import ManageReferrals from './pages/dashboard/ManageReferals';

const App = () => {
  return (
    <React.Fragment>
      <Toaster position="top-center" />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getstarted" element={<GetStarted />} />
        
        {/* Protected Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout child={<Userdashboard />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/investment"
          element={
            <ProtectedRoute>
              <MainLayout child={<Investments />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/confirminvestment"
          element={
            <ProtectedRoute>
              <MainLayout child={<Confirminvestments />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/transactions"
          element={
            <ProtectedRoute>
              <MainLayout child={<TransactionHistory />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/withdraw"
          element={
            <ProtectedRoute>
              <MainLayout child={<Withdraw />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/deposit1"
          element={
            <ProtectedRoute>
              <MainLayout child={<ManualDeposit />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/deposit2"
          element={
            <ProtectedRoute>
              <MainLayout child={<AutoDeposit />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile2"
          element={
            <ProtectedRoute>
              <MainLayout child={<DesktopUserProfile />} />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <AdminLayout child={<Profile />} />
            </ProtectedRoute>
          }
        /> */}

        <Route 
          path='/user/referral' 
          element={
            <ProtectedRoute>
              <MainLayout child={<ManageReferrals />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout child={<AdminDashboard />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/createinvestment"
          element={
            <ProtectedRoute>
              <AdminLayout child={<CreateInvestments />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manageinvestments"
          element={
            <ProtectedRoute>
              <AdminLayout child={<ManageInvestments />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manageinvestors"
          element={
            <ProtectedRoute>
              <AdminLayout child={<AllInvestors />} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin/manageinvestors/:id"
            element={<InvestorProfile />}
          />
        </Route>
        <Route
          path="/admin/managetransactions"
          element={
            <ProtectedRoute>
              <AdminLayout child={<ManageTransactions />} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin/managetransactions/incoming"
            element={<ConfirmDeposit />}
          />
          <Route
            path="/admin/managetransactions/outgoing"
            element={<ConfirmWithdrawal />}
          />
        </Route>
        <Route
          path="/admin/approvekyc"
          element={
            <ProtectedRoute>
              <AdminLayout child={<ApproveKyc />} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/superadmin/manageadmin"
          element={
            <ProtectedRoute>
              <AdminLayout child={<ManageAdmins />} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/superadmin/manageadmin/:id"
            element={<AdminProfile />}
          />
        </Route>
        
        <Route path="*" element={<Notfound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
