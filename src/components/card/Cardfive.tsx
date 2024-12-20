import React from 'react';
import { NavLink } from 'react-router-dom';

interface CardFiveProps {
	id?: number;
	name: string;
	maxAmount: number;
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
	return `NGN ${amount?.toLocaleString('en-NG')}`;
};

const CardFive: React.FC<CardFiveProps> = ({
	id,
	name,
	amount,
	duration,
	interestRate,
	optStyle,
	optStyle2,
	payOutDate,
	tier,
	action,
}) => {
  return (
    <div className="p-6 rounded-lg shadow-sm shadow-tet/30 border border-pry bg-pry/40 text-sec space-y-6 transition-all hover:shadow-md">
      <h3 className="text-lg font-bold">Investment Information</h3>
      <ul className="space-y-4">
        <li className="flex justify-between items-center">
					<span className="text-sm text-pry">Investment Name</span>
					<span className="font-bold text-white">{name || ''}</span>
				</li>
        <li className="flex justify-between items-center">
          <span className="text-sm text-pry">Min. Investment</span>
          <span className="font-bold text-white">{formatAccountBalance(amount) || ''}</span>
        </li>
        {tier && (
          <li className="flex justify-between items-center">
            <span className="text-sm text-pry">Investment Tier</span>
            <span className="font-bold text-white">{tier}</span>
          </li>
        )}
        <li className="flex justify-between items-center">
          <span className="text-sm text-pry">Interest Rate</span>
          <span className="font-bold text-green-900">{`+${interestRate || ''}%`}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-sm text-pry">Max. Duration</span>
          <span className="font-bold text-white">{duration+" months"}</span>
        </li>
        {payOutDate && (
          <li className="flex justify-between items-center">
            <span className="text-sm text-pry">Payout Date</span>
            <span className="font-bold text-green-900">{payOutDate}</span>
          </li>
        )}
      </ul>
      <div className="flex justify-center gap-4">
        <NavLink to={`/user/investments/${id}`}>
          <button
            className={`bg-sec text-pry font-semibold rounded-lg shadow-md py-3 px-6 hover:bg-pry hover:text-sec transition-all ${optStyle}`}
          >
            Invest Now
          </button>
        </NavLink>
        {action && (
          <button
            onClick={action}
            className={`bg-red-600 text-sec font-semibold rounded-lg shadow-md py-3 px-6 hover:bg-red-700 transition-all ${optStyle2}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CardFive;
