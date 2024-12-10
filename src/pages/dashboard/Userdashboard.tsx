import React, { useEffect, useState } from "react";
import Cardtwo from "../../components/card/Cardtwo";
import CardThree from "../../components/card/Cardthree";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  total_deposit: number;
  referralBonus: number;
  balance: number;
}

interface Investment {
  id: number;
  amount: number;
  investment_start: string;
  investment_duration: number;
  investment_name: string;
}

const Userdashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoadingInvestments, setIsLoadingInvestments] = useState<boolean>(true);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [mainBalVisibility, setMainBalVisibility] = useState<boolean>(true);
  const [refBalVisibility, setRefBalVisibility] = useState<boolean>(true);

  const calculateEndDate = (startDate: string, duration: number): Date => {
    const start = new Date(startDate);
    start.setDate(start.getDate() + duration);
    return start;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingUser(true);
      setIsLoadingInvestments(true);

      try {
        const userResponse = await axios.get(`${apiURL}/user.php`, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
        setUser(userResponse.data);

        const investResponse = await axios.post(
          `${apiURL}/userInvestment.php`,
          { user_id: localStorage.getItem("ident") },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token") || "",
            },
          }
        );

        if (Array.isArray(investResponse.data.investments)) {
          setInvestments(investResponse.data.investments);
        } else {
          console.error("Unexpected investments format:", investResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingUser(false);
        setIsLoadingInvestments(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" mx-auto mt-5 space-y-10">
      {/* Swiper Section */}
      <Swiper
        pagination={{
          clickable: true,
          type: "bullets",
          dynamicBullets: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="mySwiper rounded-lg bg-white p-3"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 30 },
          1280: { slidesPerView: 2, spaceBetween: 40 },
        }}
      >
        <SwiperSlide>
          {isLoadingUser ? (
            <div className="flex justify-center items-center h-[150px]">
              <div className="w-8 h-8 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
            </div>
          ) : (
            <Cardtwo
              balType="My Main Balance"
              amount={mainBalVisibility ? user?.balance || 0 : 0}
              thisState={mainBalVisibility}
              cta="Withdraw"
              action={() => setMainBalVisibility(!mainBalVisibility)}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {isLoadingUser ? (
            <div className="flex justify-center items-center h-[150px]">
              <div className="w-8 h-8 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
            </div>
          ) : (
            <Cardtwo
              balType="My Referral Commission"
              amount={refBalVisibility ? user?.referralBonus || 0 : 0}
              thisState={refBalVisibility}
              cta="Receive Commission"
              action={() => setRefBalVisibility(!refBalVisibility)}
            />
          )}
        </SwiperSlide>
      </Swiper>

      {/* Recent Investments Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl md:text-3xl text-gray-800">
            Recent Investments
          </h3>
          <NavLink to="/user/investment" className="text-pry underline">
            View All
          </NavLink>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {isLoadingInvestments ? (
            <div className="col-span-2 flex justify-center items-center">
              <div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
            </div>
          ) : investments.length > 0 ? (
            investments.map((investment) => (
              <CardThree
                key={investment.id}
                name={investment.investment_name || "Unnamed Investment"}
                location={`Duration: ${investment.investment_duration} days`}
                price={investment.amount}
                startDate={new Date(investment.investment_start)}
                endDate={calculateEndDate(investment.investment_start, investment.investment_duration)}
              />
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center text-gray-500 space-y-2">
              <FaExclamationCircle className="text-4xl" />
              <p>No investments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
