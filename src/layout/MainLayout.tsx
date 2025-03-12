import React, { useEffect, useState } from "react";
import Leftnav from "../components/nav/Leftnav";
import NavTwo from "../components/nav/Navtwo";
import Bottombar from "../components/nav/Bottombar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Loader from '../components/Loader'

const apiURl = import.meta.env.VITE_API_URL

interface MainLayoutProps {
  child: React.ReactNode;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ child }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiURl}/user.php`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        // console.log(response.data);
        
        if (response.data && response.status === 200) {
          setUser(response.data);
        } else {
          // navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // navigate("/login");
      } finally {
        // setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // if (isLoading) {
  //   return (
  //     <Loader/>
  //   );
  // }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Left Navigation */}
      <div className="hidden lg:block lg:w-[23%] h-full">
        <Leftnav />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:pb-0 pb-24">
        {/* Top Navigation */}
        <NavTwo user={user} optStyle={"py-8"} />

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto px-5 pb-20">
          <div className="max-h-full">{child}</div>
        </div>

        {/* Bottom Navigation */}
        <Bottombar />
      </div>
    </div>
  );
};

export default MainLayout;
