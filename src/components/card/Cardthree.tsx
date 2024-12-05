import React from 'react';
import CountdownTimer from '../../hooks/Countdown';
import { FaArrowRight } from 'react-icons/fa6';

interface CardThreeProps {
  name: string;
  location: string;
  price: number;
  startDate: Date;
  endDate: Date;
}

const formatAccountBalance = (amount: number) => {
  return `NGN ${amount.toLocaleString("en-NG")}`;
};

const CardThree: React.FC<CardThreeProps> = ({ name, location, price, startDate, endDate }) => {

  return (
    <div className="Cardthree flex justify-between items-center px-4 py-2 rounded-xl shadow-md bg-pry/5 text-tet">
        <div className="flex flex-col">
            <b>{name}</b>
            <small>{location}</small>
            <h2>{formatAccountBalance(price)}</h2>
        </div>
        <div className="grid justify-items-end">
            <i><FaArrowRight className=''/></i>
            <CountdownTimer type='circular' startDate={startDate} endDate={endDate} />
        </div>
    </div>
  );
};

export default CardThree;
