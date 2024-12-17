import React from 'react';
import CountdownTimer from '../../hooks/Countdown';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface CardThreeProps {
  name: string;
  duration: string;
  price: number;
  startDate: string;
  endDate: string;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const formattedDate = dateStr.replace(' ', 'T');
    const parsedDate = new Date(formattedDate);
    
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", dateStr);
      return '';
    }
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return '';
  }
};

const formatAccountBalance = (amount: number) => {
  return `NGN ${amount.toLocaleString("en-NG")}`;
};

const CardThree: React.FC<CardThreeProps> = ({ name, duration, price, startDate, endDate }) => {

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const startDateObj = new Date(formattedStartDate);
  const endDateObj = new Date(formattedEndDate);

  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      console.error("Invalid Date Format");
  }

  return (

    <Link to={"/user/investment"}>
      <div className="Cardthree flex justify-between items-center px-4 py-2 rounded-xl shadow-md bg-pry/5 text-tet">
          <div className="flex flex-col">
              <b>{name}</b>
              <small>{duration}</small>
              <h2>{formatAccountBalance(price)}</h2>
          </div>
          <div className="grid justify-items-end">
              <i><FaArrowRight className=''/></i>
              <CountdownTimer 
                type='circular' 
                startDate={startDateObj} 
                endDate={new Date(formatDate(endDate))} 
              />
          </div>
      </div>
    </Link>

  );
};

export default CardThree;
