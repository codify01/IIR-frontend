import React from "react";
import { NavLink } from "react-router-dom";

// React Icons (updated set)
import { FiHome } from "react-icons/fi";
import { FiDollarSign, FiUsers } from "react-icons/fi";
// import { BiTransferAlt } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { BiMoneyWithdraw, BiTransferAlt } from "react-icons/bi";
import { MdAdminPanelSettings, MdOutlinePersonSearch } from "react-icons/md";
// import { MdPeople } from "react-icons/md";

const Bottombar: React.FC = () => {
  const currentUserRole:any = localStorage.getItem('role');

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
      icon: <BiMoneyWithdraw
       className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/deposit1",
      title: "Deposit",
      icon: <GiPayMoney className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/user/transactions",
      title: "Transactions",
      icon: <FiDollarSign className="h-5 w-5" />,
      role: "investor",
    },
    {
      href: "/admin/dashboard",
      title: "Dashboard",
      icon: <MdAdminPanelSettings className="h-5 w-5" />,
      role: "admin",
    },
 
    {
      href: "/admin/managetransactions",
      title: "Transactions",
      icon: <FiDollarSign className="h-5 w-5" />,
      role: "admin",
    },
 
    {
      href: "/admin/manageinvestors",
      title: "Investors",
      icon: <FiUsers className="h-5 w-5" />,
      role: "admin",
    },
    {
      href: "/admin/approvekyc",
      title: "KYC",
      icon: <MdOutlinePersonSearch className="h-5 w-5" />,
      role: "admin",
    },
  ];

  const filteredLinks = Eachlink.filter((link) => link.role.includes(currentUserRole));

  return (
    <div className="fixed bottom-0 left-0 w-full z-10 bg-sec shadow-[0_-3px_5px_rgba(0,0,0,0.1)] px-5 pt-5 md:py-4 lg:hidden block">
      <ul className="flex items-center justify-between text-lg gap-3">
        {filteredLinks.map(({ href, title, icon }, index) => (
          <NavLink
            to={href}
            key={index}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm px-0.5 ${
                isActive
                  ? "text-pry opacity-100 border-b-2 border-pry py-1 mb-1"
                  : "text-tet opacity-60 hover:opacity-100"
              } transition-all duration-300 ease-in-out`
            }
            aria-label={title}
          >
            <span>{icon}</span>
            <span className="text-[12px]">{title}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Bottombar;
