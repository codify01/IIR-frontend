import React, { useEffect, useState } from "react";
import CardFour from "../../components/card/Cardfour";
import CardFive from "../../components/card/Cardfive";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

interface Investment {
  id: string;
  user_id: string;
  transaction_id: string;
  amount: string;
  transaction_type: string;
  investment_duration: string;
  pay_out_date: string;
  investment_start: string;
  investment_end: string;
  roi: number;
  date: string;
}

interface AvailableInvestment {
  id:number
  minimum_amount: number;
  investment_duration: string;
  roi: string;
}

const Investments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"myInvestments" | "availableInvestments">(
    "myInvestments"
  );
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [availableInvestments, setAvailableInvestments] = useState<AvailableInvestment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      setIsLoading(true);
      try {
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

        if (investResponse.data?.status === "success") {
          setInvestments(investResponse.data.investments || []);
        } else {
          console.error("Unexpected response:", investResponse.data);
        }

        const availableInvestmentsResponse = await axios.get(`${apiURL}/investmentPlans.php`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });

        if (Array.isArray(availableInvestmentsResponse.data.investments)) {
          setAvailableInvestments(availableInvestmentsResponse.data.investments);
        } else {
          console.error(
            "Unexpected data format for Available Investments:",
            availableInvestmentsResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching investments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const renderInvestments = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center col-span-2">
          <div className="w-12 h-12 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
        </div>
      );
    }

    if (activeTab === "myInvestments") {
      return investments.length > 0 ? (
        investments.map(
          ({
            id,
            amount,
            investment_duration,
            pay_out_date,
            investment_start,
            investment_end,
            roi,
          }) => (
            <CardFour
              key={id}
              amount={parseFloat(amount)}
              duration={`${investment_duration} days`}
              interestRate={`${roi}%`}
              payoutDate={pay_out_date}
              startDate={investment_start}
              endDate={investment_end}
              roi={roi}
            />
          )
        )
      ) : (
        <div className="flex flex-col  items-center justify-center text-gray-500 space-y-2">
          <FaExclamationCircle className="text-4xl" />
          <p>You don’t have any investments yet.</p>
        </div>
      );
    } else {
      return availableInvestments.length > 0 ? (
        availableInvestments.map(({id, minimum_amount, investment_duration, roi }, index) => (
          <CardFive
            key={index}
            id={id}
            amount={minimum_amount}
            duration={investment_duration}
            interestRate={roi}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
          <FaExclamationCircle className="text-4xl" />
          <p>No investments available at the moment.</p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex justify-center gap-6 items-center bg-pry text-sec rounded-xl p-3">
        <button
          className={`relative w-full p-3 text-center font-medium rounded-md transition-all ${
            activeTab === "myInvestments"
              ? "bg-sec text-pry shadow-md"
              : "hover:bg-sec hover:text-pry"
          }`}
          onClick={() => setActiveTab("myInvestments")}
        >
          My Investments
          {activeTab === "myInvestments" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-pry rounded-t-md"></span>
          )}
        </button>
        <button
          className={`relative w-full p-3 text-center font-medium rounded-md transition-all ${
            activeTab === "availableInvestments"
              ? "bg-sec text-pry shadow-md"
              : "hover:bg-sec hover:text-pry"
          }`}
          onClick={() => setActiveTab("availableInvestments")}
        >
          Available Investments
          {activeTab === "availableInvestments" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-pry rounded-t-md"></span>
          )}
        </button>
      </div>

      {/* Investment Cards */}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">{renderInvestments()}</div>
    </div>
  );
};

export default Investments;
