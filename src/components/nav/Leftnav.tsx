import React from "react";
import img1 from "../../assets/image/img1.png";
import { NavLink } from "react-router-dom";
import { IoHome, IoLogOut } from "react-icons/io5";
import { RiExchangeDollarLine, RiFolderAddFill, RiFolderSettingsFill, RiHistoryFill} from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiPayMoney, GiTakeMyMoney} from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { FaRegAddressCard, FaUsersCog, FaUserShield } from "react-icons/fa";

const Leftnav: React.FC = () => {
  const currentUserRole:any = localStorage.getItem("role");

  const handleLogOut = () => {
    localStorage.clear(); // Clear all local storage keys
    window.location.reload();
  };

  const Eachlink = [
    {
        href: '/user/dashboard',
        title: 'Home',
        icon: <IoHome className="size-4" />,
        role: "investor",
    },
    {
        href: '/user/investment',
        title: 'Investment',
        icon: <RiExchangeDollarLine className="size-4" />,
        role: "investor",
    },
    {
        href: '/user/withdraw',
        title: 'Withdraw',
        icon: <BiMoneyWithdraw className="size-4" />,
        role: "investor",
    },
    {
        href: '/user/deposit1',
        title: 'Manual Deposit',
        icon: <GiPayMoney className="size-4" />,
        role: "investor",
    },
    {
        href: '/user/deposit2',
        title: 'Auto Deposit',
        icon: <GiPayMoney className="size-4" />,
        role: "investor",
    },
    {
        href: '/user/transactions',
        title: 'Transaction History',
        icon: <RiHistoryFill className="size-4" />,
        role: "investor",
    },
    {
        href: '/admin/dashboard',
        title: 'Admin Dashboard',
        icon: <GrUserAdmin className="size-4" />,
        role: "admin",
    },
    {
        href: '/admin/createinvestment',
        title: 'Create Investment',
        icon: <RiFolderAddFill className="size-4" />,
        role: "admin",
    },
    {
        href: '/admin/managetransactions',
        title: 'Manage Transactions',
        icon: <GiTakeMyMoney className="size-4" />,
        role: "admin",
    },
    {
        href: '/admin/manageinvestments',
        title: 'Manage Investments',
        icon: <RiFolderSettingsFill className="size-4" />,
        role: "admin",
    },
    {
        href: '/admin/manageinvestors',
        title: 'Manage Investors',
        icon: <FaUsersCog className="size-4" />,
        role: "admin",
    },
    {
        href: '/admin/approvekyc',
        title: 'Know-Your-Customer',
        icon: <FaRegAddressCard className="size-4" />,
        role: "admin",
    },
    
];

  const filteredLinks = Eachlink.filter((link) => link.role.includes(currentUserRole));

  return (
    <div className="w-1/4 h-[100vh] bg-pry/30 lg:flex hidden flex-col justify-between px-5 pt-4 pb-5">
      <div className="flex mx-auto items-end">
        <img src={img1} alt="Logo" />
        <h3 className="font-semibold text-[#2F5318]">Pineleafestates</h3>
      </div>

      <ul className="flex flex-col gap-6 text-base h-[77%] mt-3 pb-2 overflow-y-auto">
        {filteredLinks.map(({ href, title, icon }, index) => (
          <NavLink
            to={href}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "bg-sec text-pry flex items-center gap-4 px-3 py-3 rounded-md shadow-md"
                : "flex items-center gap-4 px-3 py-2 rounded-md hover:bg-sec hover:shadow-md hover:text-tet transition-all"
            }
          >
            <span>{icon}</span>
            <span>{title}</span>
          </NavLink>
        ))}
      </ul>

      <button onClick={handleLogOut} className="outline-0 flex items-center gap-2 hover:text-red-500">
        <IoLogOut />
        Logout
      </button>
    </div>
  );
};

export default Leftnav;
