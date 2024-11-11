// "use client";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Bar,
// } from "recharts";

// const chartData = [
//   { name: "S", value: 1.7 },
//   { name: "M", value: 2 },
//   { name: "T", value: 1.4 },
//   { name: "W", value: 3 },
//   { name: "T", value: 1.8 },
//   { name: "F", value: 2.4 },
//   { name: "S", value: 1.9 },
// ];

// const ActivityChart = () => {
//   const CustomTooltip = ({
//     payload,
//     active,
//   }: {
//     payload?: any;
//     label?: any;
//     active?: any;
//   }) => {
//     if (active) {
//       return (
//         <div className="w-16 h-10 rounded-md flex items-center border-[#9CA3AF] justify-center border bg-white">
//           <p className="label">{`${payload[0]?.value}`}</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="w-full h-full bg-gray-50 p-4 rounded-lg">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart accessibilityLayer data={chartData}>
//           <XAxis
//             dataKey="name"
//             tick={{ fontSize: 12, fontWeight: 600, fill: "#9CA3AF" }} // Styling x-axis labels Remove tick line
//           />
//           <YAxis
//             domain={[1, 3]} // Set min and max values
//             tick={{ fontSize: 12, fontWeight: 600, fill: "#9CA3AF" }} // Styling y-axis labels
//           />
//           <Tooltip
//             content={<CustomTooltip />}
//             contentStyle={{ borderRadius: "8px", padding: "10px" }}
//           />
//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#000"
//             strokeWidth={3}
//             dot={false} // Removes points on the line
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ActivityChart;


"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "S", value: 1.7 },
    { name: "M", value: 2 },
    { name: "T", value: 1.4 },
    { name: "W", value: 3 },
    { name: "T", value: 1.8 },
    { name: "F", value: 2.4 },
    { name: "S", value: 1.9 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#000",
  },
  mobile: {
    label: "Mobile",
    color: "#000",
  },
} satisfies ChartConfig;

function ActivityChart() {
  return (
    <Card className="w-full h-full bg-gray-50 p-4 rounded-lg">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="#00000"
              strokeWidth={2}
              dot={{
                fill: "#000",
              }}
              activeDot={{
                r: 4,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ActivityChart;
