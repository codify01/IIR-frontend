import React, { useEffect, useState } from 'react';
import CardFour from '../../components/card/Cardfour';
import CardFive from '../../components/card/Cardfive';
import axios from 'axios';

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
  minimum_amount:number, investment_duration:string,roi:string 
}

const Investments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'myInvestments' | 'availableInvestments'>('myInvestments');
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [availableInvestments, setAvailableInvestments] = useState<AvailableInvestment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      setIsLoading(true);
      try {
        // Fetch My Investments
        const investResponse = await axios.post(
          `${apiURL}/userInvestment.php`,
          { user_id: localStorage.getItem('ident') },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token') || '',
            },
          }
        );

        if (investResponse.data?.status === 'success') {
          setInvestments(investResponse.data.investments || []);
        } else {
          console.error('Unexpected response:', investResponse.data);
        }

        const availableInvestmentsResponse = await axios.get(`${apiURL}/investmentPlans.php`, {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });

        if (Array.isArray(availableInvestmentsResponse.data.investments)) {
          setAvailableInvestments(availableInvestmentsResponse.data.investments);
        } else {
          console.error('Unexpected data format for Available Investments:', availableInvestmentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching investments:', error);
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
          <div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
        </div>
      );
    }

    if (activeTab === 'myInvestments') {
      return investments.length > 0 ? (
        investments.map(({ id, amount, investment_duration, pay_out_date, investment_start, investment_end, roi }) => (
          <CardFour
            key={id}
            amount={parseFloat(amount)} // Convert string to number
            duration={`${investment_duration} days`}
            interestRate={`${roi}%`}
            payoutDate={pay_out_date}
            startDate={investment_start}
            endDate={investment_end}
            roi={roi}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">You don’t have any investments yet.</p>
      );
    } else {
      return availableInvestments.length > 0 ? (
        availableInvestments.map(({ minimum_amount, investment_duration,roi }, index) => (
          <CardFive key={index} amount={minimum_amount} duration={investment_duration} interestRate={roi} />
        ))
      ) : (
        <p className="text-center text-gray-500">No investments available at the moment.</p>
      );
    }
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex justify-between gap-8 items-center bg-pry text-sec rounded-xl p-3">
        <button
          className={`w-full p-3 rounded-[inherit] transition-all ${
            activeTab === 'myInvestments' ? 'bg-sec text-pry shadow-lg' : 'hover:bg-sec hover:text-pry'
          }`}
          onClick={() => setActiveTab('myInvestments')}
        >
          My Investments
        </button>
        <button
          className={`w-full p-3 rounded-[inherit] transition-all ${
            activeTab === 'availableInvestments' ? 'bg-sec text-pry shadow-lg' : 'hover:bg-sec hover:text-pry'
          }`}
          onClick={() => setActiveTab('availableInvestments')}
        >
          Available Investments
        </button>
      </div>

      {/* Investment Cards */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">{renderInvestments()}</div>
  
    </div>
  );
};

export default Investments;
