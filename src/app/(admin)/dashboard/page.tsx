import React from "react";
import WeekCalendar from "@/components/custom/week-calendar";
import { TaskTodayCard } from "@/components/cards/task-today.card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CircularChart from "@/components/custom/circular-chart";
import ActivityChart from "@/components/custom/ActivityChart";



const DashboardPage = () => {
  return (
    <div className="flex bg-indigo-50">
      <div className="max-w-[95%] flex  items-start lg:flex-row flex-col w-full px-5 pt-10">
        <div className="flex w-full h-52 items-center xl:flex-row flex-col gap-8">
          <CircularChart />
          <ActivityChart />
        </div>
      </div>
      <ScrollArea className="h-[100vh] pr-2 rounded-md border">
        <div className="flex flex-col bg-white p-4 space-y-4 ">
          <WeekCalendar />
          <TaskTodayCard />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;
