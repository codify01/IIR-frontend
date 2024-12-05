import React from 'react';
import { NavLink } from 'react-router-dom';

interface CardFiveProps {
    amount: number;
    duration: string;
    interestRate?: string;
    optStyle?: string;
    optStyle2?: string;
    payOutDate?: string;
    tier?: string;
    action?: () => void;
}

const formatAccountBalance = (amount: number) => {
    return `NGN ${amount.toLocaleString("en-NG")}`;
};

const CardFive: React.FC<CardFiveProps> = ({ amount, duration, interestRate, optStyle, payOutDate, tier}) => {

  return (
    <div className="Cardfive p-5 rounded-lg shadow-lg shadow-tet/30 bg-pry text-sec space-y-5">
        <h3 className='font-semibold'>Investment Information</h3>
        <ul className="flex flex-col gap-3">
            <li className='flex justify-between items-center gap-2 text-sm'>
                <span>Min. Investment</span>
                <span className='font-bold'>{formatAccountBalance(amount)}</span>
            </li> 
            <li className={`flex justify-between items-center gap-2 text-sm ${!tier ? "hidden" : "block"}`}>
                <span>Investment tier</span>
                <span className='font-bold'>{tier}</span>
            </li>
            <li className='flex justify-between items-center gap-2 text-sm'>
                <span>Interest Rate</span>
                <span className='font-bold'>{`+${interestRate}`}</span>
            </li>
            <li className='flex justify-between items-center gap-2 text-sm'>
                <span>Max. Duration</span>
                <span className='font-bold'>{duration}</span>
            </li>
            <li className={`flex justify-between items-center gap-2 text-sm ${!payOutDate ? "hidden" : "block"}`}>
                <span>Payout Date</span>
                <span className='font-bold'>{payOutDate}</span>
            </li>
        </ul>
        <div className="text-center w-full space-x-5">
            <NavLink to={"/user/confirminvestment"}>
                <button className={`${optStyle} mx-auto bg-sec text-pry rounded-lg shadow-xl py-3 md:w-1/3 w-1/2 hover:shadow-none hover:scale-[0.95] transition-all`}>Invest Now</button>
            </NavLink>
            {/* <button onClick={action} className={`${optStyle2} mx-auto bg-red-600 text-sec rounded-lg shadow-xl py-3 md:w-1/3 w-1/2 hover:shadow-none hover:scale-[0.95] whitespace-nowrap transition-all`}>Delete</button> */}
        </div>
    </div>
  );
};

export default CardFive;
