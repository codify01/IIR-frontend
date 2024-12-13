import React, { useEffect, useState } from "react";
import Leftnav from "../components/nav/Leftnav";
import NavTwo from "../components/nav/Navtwo";
import Bottombar from "../components/nav/Bottombar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  child: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ child }) => {
  const [user, setUser] = useState<object>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://iirapi.sunmence.com.ng/user.php", {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        console.log(response.data);
        
        if (response.data && response.status === 200) {
          setUser(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Leftnav: Fixed Sidebar */}
      <div className="lg:w-1/5 h-full">
        <Leftnav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <NavTwo user={user} optStyle={"py-4"} />

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-5 pb-20">
          {child}
        </div>

        {/* Bottom Navigation */}
        <Bottombar />
      </div>
    </div>
  );
};

export default AdminLayout;
