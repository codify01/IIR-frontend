import React, { useEffect, useState } from "react";
import ButtonOne from "../../components/Button/Buttonone";
import MobileHome from "../../layout/MobileHome";

/**
 * Custom hook to detect screen size and determine if the view is mobile.
 */
const useMobileScreen = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Home: React.FC = () => {
  const isMobile = useMobileScreen();

  return (
    <div className="container py-0">
      {isMobile ? (
        // Mobile view
        <MobileHome />
      ) : (
        // Desktop view
        <div className="flex justify-center space-x-4">
          <ButtonOne title="Login" optStyle="w-1/2 lg:block hidden" href="/login" />
          <ButtonOne title="Register" optStyle="w-1/2 lg:block hidden" href="/register" />
        </div>
      )}
    </div>
  );
};

export default Home;
