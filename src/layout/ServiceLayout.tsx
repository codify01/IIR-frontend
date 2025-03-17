import React from "react";
import img1 from "../assets/image/img1.png";
import NavTwo from "../components/nav/Navtwo";
// import Bottombar from "../components/nav/Bottombar";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FiDollarSign, FiLogOut } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { NavLink } from "react-router-dom";

interface ServiceLayoutProps {
  child: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ child }) => {
 
    const handleLogOut = () => {
        localStorage.clear(); // Clear all local storage keys
        window.location.reload();
    };

    const EachLink = [
        {
            href: "/service/dashboard",
            title: "Dashboard",
            icon: <MdOutlinePersonSearch className="h-5 w-5" />,
            role: "server",
        },
        {
            href: "/service/withdraw",
            title: "Withdraw",
            icon: <BiMoneyWithdraw className="h-5 w-5" />,
            role: "server",
        },
        {
            href: "/service/history",
            title: "History",
            icon: <FiDollarSign className="h-5 w-5" />,
            role: "server",
        },
    ]
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Leftnav: Fixed Sidebar */}
      <div className="lg:w-[23%] h-full">
        <div className="h-[100vh] bg-pry/40 text-tet/80 lg:flex hidden flex-col justify-between px-5 pt-4 pb-5">
            <div className="max-w-16">
                <img src={img1} alt="Logo" />
            </div>

            <ul className="flex flex-col gap-4 text-base h-[77%] mt-3 pb-2 overflow-y-auto">
                {EachLink.map(({ href, title, icon }, index) => (
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <NavTwo user={"user"} optStyle={"py-4"} />

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-5 lg:pb-10 pb-20">
          {child}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full z-10 bg-sec shadow-[0_-3px_5px_rgba(0,0,0,0.1)] px-5 pt-5 md:py-4 lg:hidden block">
          <ul className="flex items-center justify-between text-lg gap-3">
            {EachLink.map(({ href, title, icon }, index) => (
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
      </div>
    </div>
  );
};

export default ServiceLayout;
