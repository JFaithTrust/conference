"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: string;
  shadowColor?: string;
  classNames?: string;
}

const CountdownTimer: React.FC<CountdownProps> = ({
  targetDate,
  shadowColor,
  classNames,
}) => {
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
        <div
          className={cn(
            "shrink-0 flex flex-row items-start justify-center  text-4xl",
            shadowColor,
            classNames
          )}
        >
          <div className="flex flex-col items-center justify-center overflow-hidden px-[30px] py-3">
            <h2 className="relative leading-[100%]">
              {addLeadingZero(days) || 0}
            </h2>
            <span className="relative text-xl leading-[100%] tracking-widest">
              Kun
            </span>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-1 py-3">
            <h2 className="relative leading-[100%]">
              {addLeadingZero(hours) || "00"}
            </h2>
            <span className="relative text-lg leading-[100%]">Soat</span>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-1 py-[19px]">
            <span className="relative leading-[50%]">:</span>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-1 py-3">
            <h2 className="relative leading-[100%]">
              {addLeadingZero(minutes) || "00"}
            </h2>
            <span className="relative text-lg leading-[100%]">Minut</span>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-1 py-[19px]">
            <span className="relative leading-[50%]">:</span>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden px-1 py-3">
            <h2 className="relative leading-[100%]">
              {addLeadingZero(seconds) || "00"}
            </h2>
            <span className="relative text-lg leading-[100%]">Soniya</span>
          </div>
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
