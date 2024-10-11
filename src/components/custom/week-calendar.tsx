"use client"
import { useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isoWeek from "dayjs/plugin/isoWeek";

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
    <div className="bg-white shadow-md rounded-md p-4 space-y-4">
      {/* Header with month and navigation */}
      <div className="flex justify-between items-center">
        <button
          className="text-primary hover:text-primary/70 focus:outline-none"
          onClick={handlePrevMonth}
        >
          &#9664;
        </button>
        <span className="font-semibold text-lg">
          {dayjs(selectedDate).format("MMMM YYYY")}
        </span>
        <button
          className=" text-primary hover:text-primary/70 focus:outline-none"
          onClick={handleNextMonth}
        >
          &#9654;
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, index) => {
          const isToday = day.isSame(new Date(), "day");
          return (
            <div
              key={day.format("YYYY-MM-DD")}
              className={`flex group flex-col items-center justify-between p-2 rounded-lg cursor-pointer 
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
                className={`flex items-center justify-center w-8 h-8 rounded-full 
                  ${
                    isToday
                      ? "bg-blue-500 text-white"
                      : "bg-primary-50 group-hover:bg-blue-500/90 group-hover:text-white text-black"
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
