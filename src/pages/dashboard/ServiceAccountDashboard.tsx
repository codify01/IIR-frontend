import React, { useEffect, useState } from "react";
import Cardtwo from "../../components/card/Cardtwo";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import CardSix from "../../components/card/Cardsix";
import { FaArrowAltCircleDown, FaWindowClose } from "react-icons/fa";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

interface ResultProps {
  id: number;
  investment_amount: number;
  investment_id: string;
  investor_name: string;
  service_fee: number;
  user_id: number;
  created_at: string;
}

const ServiceAccountDashboard: React.FC = () => {
    const [refBalVisibility, setRefBalVisibility] = useState<boolean>(true);
    const [isOpen, setIsOpened] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<ResultProps[]>([]);

    const navigate = useNavigate()
    
    const handleViewDetails = () => {
      navigate("/service/history")
    };
    
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true)
        
        try {
          const response = await axios.post(`${apiURL}/serviceAccount.php`);
          // const response = await axios.post("https://investmentapi.pineleafestates.com/serviceAccount.php");
          console.log("response data", response.data);
          if (response.data.status === "success") {
            try {
              const response2 = await axios.post(`${apiURL}/allService.php`);
              console.log("response2 data", response2.data);
              console.log("response2 data data", response2.data.data);
              setResult(response2.data.data)
              console.log("result", result);
              
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false)
        }
      };
      
      
      fetchData();
      console.log(result);
    }, []);


    const [currentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(4);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const response = await axios.post(`${apiURL}/allService.php`);
          if (response.data.status === "success") {
            setResult(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setTimeout(() => {
      // }, 10000)
      setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const paginatedData = result.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const summa = result.reduce((sum, { service_fee }) => sum + Number(service_fee || 0), 0)

    return (

      <>
      
        <div className=" mx-auto mt-5 space-y-10">
          {
            isLoading ? (
              <div className="flex justify-center items-center h-[150px]">
                <div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
              </div>
            )
            :
            (
              <div className="lg:w-1/2 md:w-2/3 w-full">
                <Cardtwo
                  balType="Service Charge Balance"
                  amount={summa}
                  thisState={refBalVisibility}
                  cta="Withdraw Earnings"
                  redirect="/service/withdraw"
                  newStyle="pointer-events-none"
                  action={() => setRefBalVisibility(!refBalVisibility)}
                />
              </div>
            )
          }

          {/* Recent Investments Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-2xl md:text-3xl text-gray-800">
                Recent Earnings
              </h3>
              <NavLink to="/service/history" className="text-pry underline">
                View All
              </NavLink>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {
                isLoading ? (
                  <div className="col-span-2 flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
                  </div>
                )
                :
                (
                  paginatedData.map((transaction, index) => (
                    <CardSix
                      key={index}
                      type={"1% Service Charge"}
                      amount={Number(transaction.service_fee)}
                      date={transaction.created_at}
                      category={"investment"}
                      onViewDetails={() => handleViewDetails()}
                    />
                  ))
                )
              }
            </div>
          </div>

        </div>

      </>

    )

}

export default ServiceAccountDashboard