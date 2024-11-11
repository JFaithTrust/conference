"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

const CountDownConference: React.FC<CountdownProps> = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [isClient, setIsClient] = useState(false);

  function calculateRemainingTime() {
    const targetDateTime = new Date(targetDate).getTime();
    const currentDateTime = new Date().getTime();
    return Math.max(0, targetDateTime - currentDateTime);
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

  return (
    <>
      {isClient && (
        <div className="shrink-0 font-medium text-sm flex flex-row items-start justify-center py-0  pl-0 gap-[6px]">
          <div className="rounded-3xl flex flex-col items-center justify-center py-1.5">
            <div className="relative leading-[100%]">
              {addLeadingZero(days) || 0} kun {addLeadingZero(hours) || "00"} : {addLeadingZero(minutes) || "00"} : {addLeadingZero(seconds) || "00"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountDownConference;
