"use client";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

dayjs.extend(localizedFormat);
dayjs.extend(isoWeek);

const daysOfWeekLetters = ["S", "M", "T", "W", "T", "F", "S"];

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startOfCurrentWeek = dayjs(selectedDate).startOf("week");

  const daysOfWeek = Array.from(new Array(7)).map((_, index) =>
    startOfCurrentWeek.add(index, "day")
  );

  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDate).subtract(1, "month");
    setSelectedDate(newDate.toDate());
  };

  const handleNextMonth = () => {
    const newDate = dayjs(selectedDate).add(1, "month");
    setSelectedDate(newDate.toDate());
  };

  return (
    <div className="space-y-4 rounded-md bg-white p-4 shadow-md">
      {/* Header with month and navigation */}
      <div className="flex items-center justify-between">
        <button
          className="rotate-90 text-primary hover:text-primary/70 focus:outline-none"
          onClick={handlePrevMonth}
        >
          <MdOutlineArrowDropDown size={36} />
        </button>
        <span className="text-lg font-semibold">
          {dayjs(selectedDate).format("MMMM YYYY")}
        </span>
        <button
          className=" -rotate-90 text-primary hover:text-primary/70 focus:outline-none"
          onClick={handleNextMonth}
        >
          <MdOutlineArrowDropDown size={36} />
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, index) => {
          const isToday = day.isSame(new Date(), "day");
          return (
            <div
              key={day.format("YYYY-MM-DD")}
              className={`group flex cursor-pointer flex-col items-center justify-between rounded-lg p-2 
                ${isToday ? "bg-primary text-white" : "bg-gray-100 text-black"}
                hover:bg-primary/90 hover:text-white`}
              onClick={() => setSelectedDate(day.toDate())}
            >
              <span
                className={`text-sm font-medium ${
                  isToday ? "text-white" : "text-black"
                }`}
              >
                {daysOfWeekLetters[index]}
              </span>
              <div
                className={`flex size-8 items-center justify-center rounded-full 
                  ${
                    isToday
                      ? "bg-blue-500 text-white"
                      : "bg-primary-50 text-black group-hover:bg-blue-500/90 group-hover:text-white"
                  }`}
              >
                <span className="text-sm font-medium">{day.format("D")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
