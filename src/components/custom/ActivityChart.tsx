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
    <Card className="size-full rounded-lg bg-gray-50 p-4">
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
