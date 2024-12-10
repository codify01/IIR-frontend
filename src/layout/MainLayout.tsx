import React, { useEffect, useState } from "react";
import Leftnav from "../components/nav/Leftnav";
import NavTwo from "../components/nav/Navtwo";
import Bottombar from "../components/nav/Bottombar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://iirapi.sunmence.com.ng/user.php", {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });

        if (response.data && response.status === 200) {
          setUser(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Left Navigation */}
      <div className="hidden lg:block w-1/4 h-full bg-pry">
        <Leftnav />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <NavTwo user={user} optStyle={"py-4"} />

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
