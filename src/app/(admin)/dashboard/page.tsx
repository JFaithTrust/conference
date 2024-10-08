"use client";
import React, { useState } from "react";
import Sidebar from "@/components/layout/side-bar";
import WeekCalendar from "@/components/custom/week-calendar";
import { TaskTodayCard } from "@/components/cards/task-today.card";
import { ScrollArea } from "@/components/ui/scroll-area";


const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-indigo-50 justify-between w-full">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="max-w-[60%] w-full ">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          adipisci impedit a odio alias et quisquam laudantium corrupti libero,
          eveniet officiis pariatur omnis tempore quibusdam illo recusandae quia
          inventore sed.
        </p>
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
