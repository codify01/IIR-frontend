import React from 'react';
import CountdownTimer from '../../hooks/Countdown';

interface CardFourProps {
    amount: number;
    roi: number;
    duration: string;
    interestRate: string;
    payoutDate: string;
    startDate: string;
    endDate: string;
}

const formatAccountBalance = (amount: number): string => {
    return `NGN ${amount?.toLocaleString("en-NG")}`;
};

// // Helper function to format the date correctly
// const formatDate = (dateStr: string): string => {
//     if (!dateStr) return '';
//     console.log("dateStr to be formatted", dateStr);
//     const formattedDate = dateStr.replace(' ', 'T');
//     console.log("Formatted Date:", formattedDate);  // Log the formatted date
//     return formattedDate;
// };

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
  

// CardFour component definition
const CardFour: React.FC<CardFourProps> = ({ 
    amount, 
    roi, 
    duration, 
    interestRate, 
    payoutDate, 
    startDate,
}) => {
   
    // Calculate the ROI based on the amount and roi percentage
    const calculatedRoi = (amount * roi) / 100;

    // Apply date formatting to start and end dates
    const formattedStartDate = formatDate(startDate);

    // Create Date objects and check if they are valid
    const startDateObj = new Date(formattedStartDate);

    // Check if the Date object is valid
    if (isNaN(startDateObj.getTime())) {
        console.error("Invalid Date Format");
    }

    return (
        <div className="Cardfour p-5 rounded-lg border border-pry shadow-sm shadow-tet/30 bg-pry/40 text-sec space-y-5">
            <h3 className='font-semibold'>Investment Information</h3>
            <ul className="flex flex-col gap-2">
                <li className='flex justify-between items-center'>
                    <span className='text-pry'>Invested Amount</span>
                    <span className='font-bold'>{formatAccountBalance(amount)}</span>
                </li> 
                <li className='flex justify-between items-center'>
                    <span className='text-pry'>Total Duration</span>
                    <span className='font-bold'>{duration}</span>
                </li>
                <li className='flex justify-between items-center'>
                    <span className='text-pry'>Interest Rate</span>
                    <span className='font-bold'>{interestRate}</span>
                </li> 
                <li className='flex justify-between items-center'>
                    <span className='text-pry'>ROI</span>
                    <span className='font-bold text-green-900'>{formatAccountBalance(calculatedRoi)}</span>
                </li>
                <li className='flex justify-between items-center'>
                    <span className='text-pry'>Payout Date</span>
                    <span className='font-bold'>{payoutDate}</span>
                </li> 
            </ul>
            <div className="space-y-2">
                <p className='text-sm text-pry'>Investment Progress</p>
                {/* Pass formatted start and end dates to CountdownTimer */}
                <CountdownTimer 
                    type='line' 
                    startDate={startDateObj} 
                    endDate={new Date(formatDate(payoutDate))} 
                />
            </div>
        </div>
    );
};

export default CardFour;
