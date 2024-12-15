import React from "react";
import img1 from "../../assets/image/img1.png";
import { NavLink } from "react-router-dom";
import { FiHome, FiLogOut, FiDollarSign, FiUsers } from "react-icons/fi";
import { BiTransferAlt, BiMoneyWithdraw } from "react-icons/bi";
import {GiPayMoney } from "react-icons/gi";
import { MdAdminPanelSettings, MdOutlinePersonSearch } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
// import { FaUserCheck } from "react-icons/fa";

const Leftnav: React.FC = () => {
  const currentUserRole: any = localStorage.getItem("role");

  const handleLogOut = () => {
    localStorage.clear(); // Clear all local storage keys
    window.location.reload();
  };

  const Eachlink = [
    {
      href: "/user/dashboard",
      title: "Home",
      icon: <FiHome className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/investment",
      title: "Investment",
      icon: <BiTransferAlt className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/withdraw",
      title: "Withdraw",
      icon: <BiMoneyWithdraw className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/deposit",
      title: "Deposit",
      icon: <GiPayMoney className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/transactions",
      title: "Transaction History",
      icon: <FiDollarSign className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/referral",
      title: "Referrals",
      icon: <FaUsers className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/admin/dashboard",
      title: "Admin Dashboard",
      icon: <MdAdminPanelSettings className="h-5 w-5" />,
      role: "admin",
    },
 
    {
      href: "/admin/managetransactions",
      title: "Manage Transactions",
      icon: <FiDollarSign className="h-5 w-5" />,
      role: "admin",
    },
 
    {
      href: "/admin/manageinvestors",
      title: "Manage Investors",
      icon: <FiUsers className="h-5 w-5" />,
      role: "admin",
    },
    {
      href: "/admin/approvekyc",
      title: "Know-Your-Customer",
      icon: <MdOutlinePersonSearch className="h-5 w-5" />,
      role: "admin",
    },
  ];

  const filteredLinks = Eachlink.filter((link) => link.role.includes(currentUserRole));

  return (
    <div className="h-[100vh] bg-pry/40 text-tet/80 lg:flex hidden flex-col justify-between px-5 pt-4 pb-5">
      <div className="max-w-16">
        <img src={img1} alt="Logo" />
      </div>

      <ul className="flex flex-col gap-4 text-base h-[77%] mt-3 pb-2 overflow-y-auto">
        {filteredLinks.map(({ href, title, icon }, index) => (
          <NavLink
            to={href}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "bg-sec text-pry flex items-center gap-4 px-3 py-3 rounded-md shadow-md"
                : "flex items-center gap-4 px-3 py-3 rounded-md hover:bg-sec hover:shadow-md hover:text-tet transition-all"
            }
          >
            <span>{icon}</span>
            <span className="whitespace-nowrap" >{title}</span>
          </NavLink>
        ))}
      </ul>

      <button
        onClick={handleLogOut}
        className="outline-0 flex items-center gap-2 hover:text-red-500"
      >
        <FiLogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
};

export default Leftnav;
