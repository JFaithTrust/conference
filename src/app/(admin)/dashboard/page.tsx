"use client";
import React, { useState } from "react";
import Sidebar from "@/components/layout/side-bar";
import WeekCalendar from "@/components/custom/week-calendar";
import { TaskTodayCard } from "@/components/cards/task-today.card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActivityChart from "@/components/custom/ActivityChart";
const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-indigo-50 justify-between w-full">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="max-w-[60%] w-full px-5 pt-10">
        <div className="flex items-center gap-8">
          <div className="w-[250px] h-full border-2 border-primary">Lorem ipsum dolor sit.</div>
          <ActivityChart />
        </div>
      </div>
      <ScrollArea className=" h-[100vh] pr-2 rounded-md border">
        <div className="flex flex-col bg-white p-4 space-y-4 ">
          <WeekCalendar />
          <TaskTodayCard />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;
