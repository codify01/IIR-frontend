import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import img12 from "../../assets/image/img12.png";
import img13 from "../../assets/image/img13.jfif";
import img14 from "../../assets/image/img14.png";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft } from "react-icons/fa";
import CardFour from "../../components/card/Cardfour";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

// Define the types for the user and investment data
interface Investment {
  amount: number;
  roi: number;
  duration: string;
  interestRate: string;
  payoutDate: string;
  startDate: string;
  endDate: string;
}

interface User {
  id: number;
  fullname: string;
  email: string;
  [key: string]: any; // Allow other dynamic properties in the future
}

const InvestorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        return;
      }
      const response = await axios.get(`${apiURL}/allUsers.php`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredId = users.filter((user) => user.id === Number(id));

  if (loading) return <div className="text-center">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <Link to="/admin/manageinvestors">Go Back</Link>
      </div>
    );

  if (!filteredId.length) {
    toast.error("User not found");
    return (
      <div className="text-center">
        <h3 className="font-bold text-4xl">User not found</h3>
        <Link to={"/admin/manageinvestors"} className="flex justify-center gap-5">
          <FaChevronLeft />
          <span>Back to users</span>
        </Link>
      </div>
    );
  }

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const myInvestments: Investment[] = [
    {
      amount: 50000,
      roi: 80000,
      duration: "6 months",
      interestRate: "10%",
      payoutDate: "16th Nov 2024",
      startDate: "2024-11-17T13:10:00",
      endDate: "2024-11-18T17:10:00",
    },
    {
      amount: 100000,
      roi: 196000,
      duration: "12 months",
      interestRate: "15%",
      payoutDate: "16th Dec 2024",
      startDate: "2024-11-17T13:10:00",
      endDate: "2024-11-19T17:40:00",
    },
  ];

  const user = filteredId[0];

  return (
    <div className="relative bg-sec lg:w-full py-5 md:px-8 px-4 rounded-lg font-semibold">
      <div className="flex justify-between items-center mb-5">
        <Link to="/admin/manageinvestors" className="flex items-center">
          <FaChevronLeft />
          <span>Close</span>
        </Link>
        <h2 className="text-2xl">{user.fullname}'s Details</h2>
      </div>

      <Swiper modules={[Navigation]} navigation className="mySwiper">
        <SwiperSlide>
          <div>
            <h3 className="text-center">Profile</h3>
            <img src={img12} alt="Profile" className="mx-auto w-1/3 rounded-full" />
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Full Name:</strong> {user.fullname}
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
            </ul>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <h3 className="text-center">KYC Documents</h3>
          <Swiper modules={[Navigation]} direction="vertical">
            {[img12, img13, img14].map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`Document ${idx + 1}`} onClick={() => openModal(img)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <h3 className="text-center">Investments</h3>
          {myInvestments.map((investment, idx) => (
            <CardFour key={idx} {...investment} />
          ))}
        </SwiperSlide>
      </Swiper>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow">
            <img src={selectedImage} alt="Selected" className="w-full h-auto" />
            <button onClick={closeModal} className="mt-4 w-full bg-red-500 text-white py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorProfile;
