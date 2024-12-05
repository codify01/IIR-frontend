import React, { useEffect, useState } from "react";
import Cardtwo from "../../components/card/Cardtwo";
import CardThree from "../../components/card/Cardthree";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import axios from "axios";

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
  investment_duration: number; // Duration in days
  investment_name: string;
}

const Userdashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoadingInvestments, setIsLoadingInvestments] = useState<boolean>(true);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [mainBalVisibility, setMainBalVisibility] = useState<boolean>(true);
  const [refBalVisibility, setRefBalVisibility] = useState<boolean>(true);

  // Calculate the end date for an investment
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
        // Fetch User Data
        const userResponse = await axios.get(`${apiURL}/user.php`, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
        setUser(userResponse.data);

        // Fetch Investment Data
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
    <div className="container">
      <Swiper
        pagination={{
          clickable: true,
          type: "bullets",
          dynamicBullets: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="mySwiper swiper2 rounded-[10px]"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 30 },
          640: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 2, spaceBetween: 30 },
          1280: { slidesPerView: 2, spaceBetween: 10 },
        }}
      >
        <SwiperSlide>
          {isLoadingUser ? (
            <div className="flex justify-center items-center h-[100px]">
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
            <div className="flex justify-center items-center h-[100px]">
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

      <div className="flex flex-col space-y-5">
        <div className="flex justify-between items-end mt-8">
          <h3 className="font-semibold md:text-3xl text-2xl">Recent Investments</h3>
          <NavLink to="/user/investment">
            <p className="text-sm cursor-pointer underline text-pry">All Investments</p>
          </NavLink>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
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
            <p className="text-gray-500 col-span-2 text-center">No investments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
