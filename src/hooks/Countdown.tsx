import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CountdownTimerProps {
  startDate: Date;
  endDate: Date;
  type: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startDate, endDate, type="circular" }) => {
  const [timeLeft, setTimeLeft] = useState({
    // days: 0,
    // hours: 0,
    // minutes: 0,
    // seconds: 0,
    percentageLeft: 0,
  });
  
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const totalTime = endDate.getTime() - startDate.getTime();
      const timeElapsed = now - startDate.getTime();
    
      // Prevent division by zero or invalid percentages
      if (totalTime <= 0 || now >= endDate.getTime()) {
        clearInterval(timerId);
        setTimeLeft({ percentageLeft: 0 });
        return;
      }
    
      const percentageLeft = Math.min(100, Math.max(0, ((totalTime - timeElapsed) / totalTime) * 100));
      
      setTimeLeft({ percentageLeft });
    };

    const timerId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [startDate, endDate]);

  return (
    <div className="flex">
      {/* <CountdownCircle label="Days" value={timeLeft.days} maxValue={365} percentage={timeLeft.percentageLeft} color="#00aaff" />
      <CountdownCircle label="Hours" value={timeLeft.hours} maxValue={24} percentage={timeLeft.percentageLeft} color="#ff0055" />
      <CountdownCircle label="Minutes" value={timeLeft.minutes} maxValue={60} percentage={timeLeft.percentageLeft} color="#ffcc00" />
      <CountdownCircle label="Seconds" value={timeLeft.seconds} maxValue={60} percentage={timeLeft.percentageLeft} color="#2F5318" /> */}
      {
        type === "circular" 
        ? 
        (<CountdownCircle label="Pecentage" value={timeLeft.percentageLeft} maxValue={100} percentage={timeLeft.percentageLeft} color="#2F5318" />)
        :
        (
          <div className="w-full relative z-[1]">
            <span className='absolute capitalize -top-2 left-[40%] z-[2] text-sec text-lg'>
              {
                timeLeft.percentageLeft <= 0 ? "completed" : Math.floor(timeLeft.percentageLeft).toFixed (1)+"%"
              }
              
            </span>
            <progress className='w-full' value={timeLeft.percentageLeft} max={100} color='#fff'></progress>
          </div>
        )
      }
    </div>
  );
};


interface CountdownCircleProps {
  label: string;
  value: number;
  maxValue: number;
  percentage: number;
  color: string;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({ 
  // label, 
  value, maxValue, percentage, color }) => (
  <div className="w-16 h-w-16 flex flex-col items-center relative z-[1]">
    <CircularProgressbar
      value={value}
      maxValue={maxValue}
    //   text={`${value}`}
      styles={buildStyles({
        textColor: color,
        pathColor: color,
        trailColor: '#2F53180D',
      })}
    />
    {/* <span className="text-center text-sm mt-2">{label}</span> */}
    <span className="text-center absolute z-[2] top-0 translate-y-5 font-bold text-sm mt-1">
      {
        percentage < 0 ? "completed" : Math.floor(percentage).toFixed(1)+"%"
      }
    </span>
  </div>
);

export default CountdownTimer;
