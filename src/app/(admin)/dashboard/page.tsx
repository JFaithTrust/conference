import React from "react";
import WeekCalendar from "@/components/custom/week-calendar";
import { TaskTodayCard } from "@/components/cards/task-today.card";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";

const ActivityChart = dynamic(
  () => import("@/components/custom/ActivityChart"),
  { ssr: false }
);
const CircularChart = dynamic(
  () => import("@/components/custom/circular-chart"),
  { ssr: false }
);

const DashboardPage = () => {
  return (
    <div className="flex bg-indigo-50">
      <div className="max-w-[95%] w-full px-5 pt-10">
        <div className="flex items-center gap-8">
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
