"use client"
import React, { useState } from "react";
import Sidebar from "@/components/layout/side-bar";

const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-indigo-50">
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashboardPage;
