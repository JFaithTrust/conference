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
        <div className=" flex shrink-0 flex-row items-start justify-center gap-[6px] py-0 pl-0  text-xs font-medium">
          <div className="flex flex-col items-center justify-center overflow-hidden rounded-3xl px-3 py-1.5">
            <div className="relative leading-[100%]">
              {addLeadingZero(days) || 0}
            </div>
            <div className="relative text-xl leading-[100%] tracking-widest">
              Kun
            </div>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-0 py-1.5">
            <div className="relative leading-[100%]">
              {addLeadingZero(hours) || "00"}
            </div>
            <div className="relative text-xl leading-[100%]">Soat</div>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-0 py-2.5">
            <div className="relative leading-[50%]">:</div>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-0 py-1.5">
            <div className="relative leading-[100%]">
              {addLeadingZero(minutes) || "00"}
            </div>
            <div className="relative text-xl leading-[100%]">Minut</div>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-0 py-2.5">
            <div className="relative leading-[50%]">:</div>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-0 py-1.5">
            <div className="relative leading-[100%]">
              {addLeadingZero(seconds) || "00"}
            </div>
            <div className="relative text-xl leading-[100%]">Soniya</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountDownConference;
