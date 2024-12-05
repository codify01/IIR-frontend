import React from 'react';
import CountdownTimer from '../../hooks/Countdown';

interface CardFourProps {
    amount: number;        // The invested amount
    roi: number;           // The ROI percentage (e.g., 5 for 5%)
    duration: string;      // Duration of the investment
    interestRate: string; // The interest rate (this is a string, assuming it's displayed as text)
    payoutDate: string;   // The date the payout will be made
    startDate: string;    // The start date of the investment
    endDate: string;      // The end date of the investment
}

// Helper function to format the amount into a currency format
const formatAccountBalance = (amount: number): string => {
    return `NGN ${amount.toLocaleString("en-NG")}`;
};

// Helper function to format the date correctly
const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const formattedDate = dateStr.replace(' ', 'T');
    console.log("Formatted Date:", formattedDate);  // Log the formatted date
    return formattedDate;
};

// CardFour component definition
const CardFour: React.FC<CardFourProps> = ({ 
    amount, 
    roi, 
    duration, 
    interestRate, 
    payoutDate, 
    startDate, 
    endDate 
}) => {
    // Calculate the ROI based on the amount and roi percentage
    const calculatedRoi = (amount * roi) / 100;

    // Apply date formatting to start and end dates
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Log the dates to check if they are correct
    console.log("Start Date:", formattedStartDate);  // Check the formatted start date
    console.log("End Date:", formattedEndDate);      // Check the formatted end date

    // Create Date objects and check if they are valid
    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);

    console.log("Start Date Object:", startDateObj);  // Check the Date object
    console.log("End Date Object:", endDateObj);      // Check the Date object

    // Check if the Date object is valid
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        console.error("Invalid Date Format");
    }

    return (
        <div className="Cardfour p-5 rounded-lg shadow-lg shadow-tet/30 bg-pry text-sec space-y-5">
            <h3 className='font-semibold'>Investment Information</h3>
            <ul className="flex flex-col gap-2">
                <li className='flex justify-between items-center'>
                    <span>Invested Amount</span>
                    <span className='font-bold'>{formatAccountBalance(amount)}</span>
                </li> 
                <li className='flex justify-between items-center'>
                    <span>Total Duration</span>
                    <span className='font-bold'>{duration}</span>
                </li>
                <li className='flex justify-between items-center'>
                    <span>Interest Rate</span>
                    <span className='font-bold'>{interestRate}</span>
                </li> 
                <li className='flex justify-between items-center'>
                    <span>ROI</span>
                    <span className='font-bold'>{formatAccountBalance(calculatedRoi)}</span>
                </li>
                <li className='flex justify-between items-center'>
                    <span>Payout Date</span>
                    <span className='font-bold'>{payoutDate}</span>
                </li> 
            </ul>
            <div className="space-y-2">
                <p className='text-sm'>Investment Progress</p>
                {/* Pass formatted start and end dates to CountdownTimer */}
                <CountdownTimer 
                    type='line' 
                    startDate={startDateObj} 
                    endDate={endDateObj} 
                />
            </div>
        </div>
    );
};

export default CardFour;
