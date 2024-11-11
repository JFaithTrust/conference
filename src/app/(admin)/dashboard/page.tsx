import React from "react";

import { TaskTodayCard } from "@/components/cards/task-today.card";
import ActivityChart from "@/components/custom/ActivityChart";
import CircularChart from "@/components/custom/circular-chart";
import WeekCalendar from "@/components/custom/week-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardPage = () => {

  return (
    <div className="flex bg-indigo-50">
      <div className="flex w-full  max-w-[95%] flex-col items-start px-5 pt-10 lg:flex-row">
        <div className="flex h-52 w-full flex-col items-center gap-8 xl:flex-row">
          <CircularChart />
          <ActivityChart />
        </div>
      </div>
      <ScrollArea className="h-screen rounded-md border pr-2">
        <div className="flex flex-col space-y-4 bg-white p-4">
          <WeekCalendar />
          <TaskTodayCard />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;
