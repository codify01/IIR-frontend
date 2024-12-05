import React from "react";
import { NavLink } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { RiExchangeDollarLine, RiFolderAddFill, RiFolderSettingsFill, RiHistoryFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { FaRegAddressCard, FaUserFriends, FaUsersCog } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";

const Bottombar: React.FC = () => {

    const currentUserRole = "investor";

    const Eachlink = [
        {
            href: '/user/dashboard',
            title: 'Home',
            icon: <IoHome className="size-4" />,
            role: ["investor"],
        },
        {
          href: '/user/investment',
          title: 'Investment',
          icon: <RiExchangeDollarLine className="size-4" />,
          role: ["investor"],
        },
        {
          href: '/user/withdraw',
          title: 'Withdraw',
          icon: <BiMoneyWithdraw className="size-4" />,
          role: ["investor"],
        },
        {
          href: '/user/deposit1',
          title: 'Manual Deposit',
          icon: <GiPayMoney className="size-4" />,
          role: ["investor"],
        },
        {
          href: '/user/deposit2',
          title: 'Auto Deposit',
          icon: <GiPayMoney className="size-4" />,
          role: ["investor"],
        },
        {
          href: '/user/transactions',
          title: 'Transaction History',
          icon: <RiHistoryFill className="size-4" />,
          role: ["investor"],
        },
        {
          href: '/user/referral',
          title: 'My Referral',
          icon: <FaUserFriends className="size-4" />,
          role: ["investor"],
        },
        {
          href: '/admin/dashboard',
          title: 'Admin Dashboard',
          icon: <GrUserAdmin className="size-4" />,
          role: ["admin", "superadmin"],
        },
        {
          href: '/admin/createinvestment',
          title: 'Create Investment',
          icon: <RiFolderAddFill className="size-4" />,
          role: ["admin", "superadmin"],
        },
        {
          href: '/admin/managetransactions',
          title: 'Manage Transactions',
          icon: <GiTakeMyMoney className="size-4" />,
          role: ["admin", "superadmin"],
        },
        {
          href: '/admin/manageinvestments',
          title: 'Manage Investments',
          icon: <RiFolderSettingsFill className="size-4" />,
          role: ["admin", "superadmin"],
        },
        {
          href: '/admin/manageinvestors',
          title: 'Manage Investors',
          icon: <FaUsersCog className="size-4" />,
          role: ["admin", "superadmin"],
        },
        {
          href: '/admin/approvekyc',
          title: 'Know-Your-Customer',
          icon: <FaRegAddressCard className="size-4" />,
          role: ["admin", "superadmin"],
        },
    ];

    const filteredLinks = Eachlink.filter(link => link.role.includes(currentUserRole));

    return (

        <div className="w-full fixed left-0 md:bottom-0 -bottom-1 z-10 lg:hidden block px-5 pb-3 md:py-4 bg-sec shadow-[0px_-3px_5px] shadow-tet/10">
            <ul className="flex items-center gap-3 justify-between text-lg mt-3">
                {
                    filteredLinks.map(({ href, title, icon }, index) => (
                        <NavLink to={href} key={index} className={({ isActive }) => isActive ? `flex flex-col items-center scale-105 opacity-100` : `flex flex-col items-center md:scale-105 scale-95 opacity-50 ${title == "Profile" ? "md:flex hidden" : null}`}>
                            <span>{icon}</span>
                            <span className="text-xs text-center">{title}</span>
                        </NavLink>
                    ))
                }
            </ul>
        </div>

    )

}

export default Bottombar