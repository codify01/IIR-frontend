import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CountdownTimerProps {
  startDate: Date;
  endDate: Date;
  type: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startDate, endDate, type = "circular" }) => {
  const [timeElapsed, setTimeElapsed] = useState({
    percentageElapsed: 0,
  });

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date().getTime();
      const totalTime = endDate.getTime() - startDate.getTime();
      const timePassed = now - startDate.getTime();

      // Prevent invalid or out-of-range values
      if (totalTime <= 0 || now >= endDate.getTime()) {
        clearInterval(timerId);
        setTimeElapsed({ percentageElapsed: 100 }); // Set to 100% when completed
        return;
      }

      const percentageElapsed = Math.min(100, Math.max(0, (timePassed / totalTime) * 100));
      setTimeElapsed({ percentageElapsed });
    };

    const timerId = setInterval(calculateTimeElapsed, 1000);
    return () => clearInterval(timerId);
  }, [startDate, endDate]);

  return (
    <div className="flex">
      {type === "circular" ? (
        <CountdownCircle
          label="Percentage"
          value={timeElapsed.percentageElapsed}
          maxValue={100}
          percentage={timeElapsed.percentageElapsed}
          color="#2F5318"
        />
      ) : (
        <div className="w-full relative z-[1]">
          <span className="absolute capitalize -top-[10px] left-[50%] -translate-x-1/2 z-[2] font-bold text-sec text-2xl">
            {timeElapsed.percentageElapsed >= 100
              ? "Completed"
              : `${Math.floor(timeElapsed.percentageElapsed).toFixed(1)}%`}
          </span>
          <progress
            className="w-full"
            value={timeElapsed.percentageElapsed}
            max={100}
            color="#fff"
          ></progress>
        </div>
      )}
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
  value,
  maxValue,
  percentage,
  color,
}) => (
  <div className="w-16 h-w-16 flex flex-col items-center relative z-[1]">
    <CircularProgressbar
      value={value}
      maxValue={maxValue}
      styles={buildStyles({
        textColor: color,
        pathColor: color,
        trailColor: '#2F53180D',
      })}
    />
    <span className="text-center absolute z-[2] top-0 translate-y-5 font-bold text-sm mt-1">
      {percentage >= 100
        ? "Completed"
        : `${Math.floor(percentage).toFixed(1)}%`}
    </span>
  </div>
);

export default CountdownTimer;
