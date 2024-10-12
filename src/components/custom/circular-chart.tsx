"use client";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const CircularChart = () => {
  const data = [
    { name: "Progress", value: 45 },
    { name: "Remaining", value: 55 },
  ];
  const COLORS = ["#6366F1", "#1F2937"]; // Progress color and background color

  return (
    <div className="w-[250px] h-full bg-gray-900 text-white p-4 rounded-lg flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold">Running Task</p>
        <p className="text-4xl font-bold mt-4">65</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="relative">
          <PieChart width={80} height={80}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={30}
              outerRadius={40}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute top-0 left-0 flex items-center justify-center w-20 h-20">
            <p className="text-xl font-bold">{data[0].value}%</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-blue-500 text-xl font-bold">100</p>
          <p className="text-sm text-gray-400">Task</p>
        </div>
      </div>
    </div>
  );
};

export default CircularChart;
