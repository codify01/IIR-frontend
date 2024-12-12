import React from 'react';

interface CardFiveProps {
    id?:number;
  amount: number;
  duration: string;
  interestRate?: string;
  optStyle?: string;
  optStyle2?: string;
  payOutDate?: string;
  tier?: string;
  planDescription?: string;
  action?: () => void;
}

const formatAccountBalance = (amount: number) => {
	return `NGN ${amount?.toLocaleString('en-NG')}`;
};

const InvestmentCard: React.FC<CardFiveProps> = ({
  amount,
  duration,
  interestRate,
  payOutDate,
  tier,
  planDescription,
}) => {
  return (
    <div className="p-6 rounded-lg shadow-sm shadow-tet/30 border border-pry bg-pry/40 text-sec space-y-6 transition-all hover:shadow-md">
      <h3 className="text-lg font-bold">Investment Information</h3>
      <ul className="space-y-4">
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
          <span className="font-bold text-green-400">{`+${interestRate || ''}`}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-sm text-pry">Max. Duration</span>
          <span className="font-bold text-white">{duration}</span>
        </li>
        {payOutDate && (
          <li className="flex justify-between items-center">
            <span className="text-sm text-pry">Payout Date</span>
            <span className="font-bold text-yellow-300">{payOutDate}</span>
          </li>
        )}
        {planDescription && (
          <li className="flex justify-between items-center">
            <span className="font-bold text-sm text-pry">{planDescription}</span>
          </li>
        )}
      </ul>
      
    </div>
  );
};

export default InvestmentCard;
