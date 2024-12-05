import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ManageTransactions: React.FC = () => {

    return (

        <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-8 items-center bg-pry text-sec rounded-lg p-3">
                <NavLink
                    to={"/admin/managetransactions/incoming"}
                    className={({isActive}) => 
                        `w-1/2 border-none outline-0 p-3 hover:bg-sec hover:text-pry rounded-[inherit] text-center ${
                        isActive 
                        ?
                        "text-pry bg-sec rounded-[inherit] shadow-lg transition-all" 
                        :
                        ""
                        }`
                    }
                >
                    Incoming Transactions
                </NavLink>
                <NavLink
                    to={"/admin/managetransactions/outgoing"}
                    className={({isActive}) => 
                        `w-1/2 border-none outline-0 p-3 hover:bg-sec hover:text-pry rounded-[inherit] text-center ${
                        isActive 
                        ?
                        "text-pry bg-sec rounded-[inherit] shadow-lg transition-all" 
                        :
                        ""
                        }`
                    }
                >
                    Pending Withdrawals
                </NavLink>
            </div>
            <div className="">
                <Outlet/>
            </div>
        </div>

    )

}

export default ManageTransactions;