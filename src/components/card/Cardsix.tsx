import React from 'react';

interface CardSixProps {
  type: string;
  amount: number;
  date: string;
  category: string;
  onViewDetails: () => void;
}

const formatAccountBalance = (amount: number) => {
  return `NGN ${amount.toLocaleString('en-NG')}`;
};

const CardSix: React.FC<CardSixProps> = ({ type, amount, date, category, onViewDetails }) => {
  return (
    <div className="flex justify-between items-center p-6 rounded-lg shadow-md bg-white text-gray-800 border border-gray-200 hover:shadow-lg transition-all ease-in-out duration-300">
      {/* Left Section */}
      <div className="flex flex-col justify-between capitalize">
        <h3 className="text-lg font-semibold">{type}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{new Date(date).toLocaleString()}</p>
        <p className="text-sm text-gray-600">{category}</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end">
        <h3
          className={`text-md font-semibold ${
            type.toLowerCase() === 'investment' ? 'text-yellow-600' : type.toLowerCase() === 'deposit' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {formatAccountBalance(amount)}
        </h3>
        <button
          className="bg-pry text-white px-4 py-2 rounded-md mt-2 text-sm font-medium hover:bg-pry/90 transition-all ease-in-out duration-300"
          onClick={onViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardSix;
