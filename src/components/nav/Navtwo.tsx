import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

interface NavTwoProps {
  optStyle: string;
  user: any;
}

const NavTwo: React.FC<NavTwoProps> = ({ optStyle, user }) => {
  const ignorePage: string[] = ['/user/profile'];

  const location = useLocation();
  const isHere = ignorePage.includes(location.pathname);

  const useMobileScreen = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
  };

  const isMobile = useMobileScreen();

  // Only render if not on ignored pages and for mobile screens
  if (isHere && isMobile) {
    return null;
  }

  // Split the fullname into first name and last name (optional)
  const fullname = user?.fullname || '';
  const [firstName] = fullname.split(' ');

  return (
    <React.Fragment>
      <nav className={`nav h-[6vh] flex justify-between items-center fixed top-0 w-full lg:w-4/5 bg-white px-6 ${optStyle}`}>
        <h3 className="text-lg font-semibold">Welcome <span className="text-pry text-xl">{firstName || user?.fullname}</span></h3>
        <div className="flex items-center gap-2">
          <NavLink to="/user/notification" className="rounded-full w-10 h-10 flex items-center justify-center">
            <FaBell className="text-pry" />
          </NavLink>
          <NavLink to="/user/profile" className="text-pry">
            <FaUserCircle size={30} />
          </NavLink>
        </div>
      </nav>
      <div className="h-[8vh]" />
    </React.Fragment>
  );
};

export default NavTwo;
