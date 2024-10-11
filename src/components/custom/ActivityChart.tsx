"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";

const chartData = [
  { name: "S", value: 1.7 },
  { name: "M", value: 2 },
  { name: "T", value: 1.4 },
  { name: "W", value: 3 },
  { name: "T", value: 1.8 },
  { name: "F", value: 2.4 },
  { name: "S", value: 1.9 },
];

const ActivityChart = () => {
  const CustomTooltip = ({
    payload,
    active,
  }: {
    payload?: any;
    label?: any;
    active?: any;
  }) => {
    if (active) {
      return (
        <div className="w-16 h-10 rounded-md flex items-center border-[#9CA3AF] justify-center border bg-white">
          <p className="label">{`${payload[0]?.value}`}</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-40 bg-gray-50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fontWeight: 600, fill: "#9CA3AF" }} // Styling x-axis labels Remove tick line
          />
          <YAxis
            domain={[1, 3]} // Set min and max values
            tick={{ fontSize: 12, fontWeight: 600, fill: "#9CA3AF" }} // Styling y-axis labels
          />
          <Tooltip
            content={<CustomTooltip />}
            contentStyle={{ borderRadius: "8px", padding: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#000"
            strokeWidth={3}
            dot={false} // Removes points on the line
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
