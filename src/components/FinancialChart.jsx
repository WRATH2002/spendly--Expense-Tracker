import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import { curveCardinal } from "d3-shape";
import { themeColor } from "../utils/constants";

// Optional: adjust tension to control smoothness
const cardinal = curveCardinal.tension(0.7);

const data = [
  { date: "1 Jan", value: 9800, prevValue: 11730, expense: 220 },
  { date: "2 Jan", value: 12560, prevValue: 21020, expense: 410 },
  { date: "3 Jan", value: 11730, prevValue: 12040, expense: 380 },
  { date: "4 Jan", value: 14900, prevValue: 8000, expense: 590 },
  { date: "5 Jan", value: 10150, prevValue: 7000, expense: 430 },
  { date: "6 Jan", value: 14240, prevValue: 10000, expense: 720 },
  { date: "7 Jan", value: 8600, prevValue: 6000, expense: 330 },
  { date: "8 Jan", value: 13270, prevValue: 8600, expense: 540 },
  { date: "9 Jan", value: 14030, prevValue: 13270, expense: 450 },
  { date: "10 Jan", value: 15260, prevValue: 14030, expense: 620 },
  { date: "11 Jan", value: 17340, prevValue: 15260, expense: 580 },
  { date: "12 Jan", value: 18970, prevValue: 17340, expense: 670 },
  { date: "13 Jan", value: 21020, prevValue: 18970, expense: 750 },
  { date: "14 Jan", value: 9700, prevValue: 21020, expense: 320 },
  { date: "15 Jan", value: 13860, prevValue: 9700, expense: 440 },
  { date: "16 Jan", value: 12890, prevValue: 13860, expense: 400 },
  { date: "17 Jan", value: 13930, prevValue: 12890, expense: 510 },
  { date: "18 Jan", value: 14750, prevValue: 13930, expense: 590 },
  { date: "19 Jan", value: 12040, prevValue: 14750, expense: 370 },
  { date: "20 Jan", value: 12670, prevValue: 12040, expense: 420 },
  { date: "21 Jan", value: 13180, prevValue: 12670, expense: 460 },
  { date: "22 Jan", value: 11890, prevValue: 13180, expense: 390 },
  { date: "23 Jan", value: 12530, prevValue: 11890, expense: 410 },
  { date: "24 Jan", value: 13410, prevValue: 12530, expense: 570 },
  { date: "25 Jan", value: 14100, prevValue: 13410, expense: 640 },
  { date: "26 Jan", value: 12030, prevValue: 14100, expense: 390 },
  { date: "27 Jan", value: 15060, prevValue: 12030, expense: 690 },
  { date: "28 Jan", value: 13700, prevValue: 15060, expense: 580 },
  { date: "29 Jan", value: 14240, prevValue: 13700, expense: 600 },
  { date: "30 Jan", value: 12860, prevValue: 14240, expense: 470 },
];

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (payload.date === "5 Feb" || payload.date === "30 Jan") {
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={4}
        fill={payload.date === "5 Feb" ? "#ff6b35" : "#6b7280"}
        stroke={payload.date === "5 Feb" ? "#ff6b35" : "#6b7280"}
        strokeWidth={2}
      />
    );
  }
  return null;
};

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border-[1.5px] border-[#202020] bg-[#10101080] flex flex-col rounded-xl p-4 shadow-xl backdrop-blur-[5px]">
        {/* <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <div>
            <p className="text-white font-semibold text-lg">
              {formatValue(payload[0].value)}
            </p>
            <p className="text-gray-400 text-sm">{data.fullDate}</p>
          </div>
        </div> */}
        <div className="flex justify-start items-center text-[14px]">
          <div
            className="min-w-[3px] min-h-[20px] rounded-full mr-[10px] "
            style={{
              backgroundColor: theme
                ? themeColor?.darkAccent
                : themeColor?.lightAccent,
            }}
          ></div>
          <div
            className=""
            style={{
              color: theme
                ? themeColor?.darkTextSecondary
                : themeColor?.lightTextSecondary,
            }}
          >
            {data.date}, 2025
          </div>
          <div className="ml-[15px]">{formatValue(payload[0].value)}</div>
        </div>
        <div className="flex justify-start items-center text-[14px] mt-[5px]">
          <div
            className="min-w-[3px] min-h-[20px] rounded-full mr-[10px] "
            style={{
              backgroundColor: theme ? "#2A2A2A" : themeColor?.lightAccent,
            }}
          ></div>
          <div
            className=""
            style={{
              color: theme
                ? themeColor?.darkTextSecondary
                : themeColor?.lightTextSecondary,
            }}
          >
            {data.date}, 2025
          </div>
          <div className="ml-[15px]">{formatValue(payload[0].prevValue)}</div>
        </div>
      </div>
    );
  }
  return null;
};

const formatValue = (value) => {
  if (value >= 1000) {
    return `₹ ${(value / 1000).toFixed(1)}k`;
  }
  return `₹ ${value}`;
};

// Calculate min, max, and average values
const values = data.map((d) => d.value);
const minValue = Math.min(...values);
const maxValue = Math.max(...values);
const avgValue = Math.round(
  values.reduce((sum, val) => sum + val, 0) / values.length
);

const FinancialChart = ({ theme }) => {
  return (
    <div className="w-full h-full">
      {/* <div className="flex flex-col lg:flex-row gap-8"> */}
      {/* Chart Section */}
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            {theme ? (
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2=".8">
                  <stop offset="0%" stopColor="#F66720" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="#F66720" stopOpacity={0.05} />
                  <stop offset="100%" stopColor="#F66720" stopOpacity={0} />
                </linearGradient>
              </defs>
            ) : (
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
            )}
            {theme ? (
              <defs>
                <linearGradient
                  id="colorGradient2"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2=".8"
                >
                  <stop offset="0%" stopColor="#2A2A2A" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="#2A2A2A" stopOpacity={0.05} />
                  <stop offset="100%" stopColor="#2A2A2A" stopOpacity={0} />
                </linearGradient>
              </defs>
            ) : (
              <defs>
                <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
            )}
            {/* <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.2}
            /> */}
            {/* <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 14 }}
              className="text-gray-400"
              tickFormatter={(value, index) => {
                // Only show first and last dates
                if (index === 0) return "1 Jan";
                if (index === data.length - 1) return "28 Feb";
                return "";
              }}
              interval={0}
            /> */}
            <YAxis
              tickFormatter={formatValue}
              axisLine={false}
              tickLine={false}
              tick={(props) => {
                const { x, y, payload } = props;
                const isAverage = payload.value === avgValue;
                return (
                  <text
                    x={x}
                    y={y}
                    fill={isAverage ? "#ff6b35" : "#9ca3af"}
                    fontSize={14}
                    textAnchor="end"
                    dy={10}
                  >
                    {formatValue(payload.value)}
                  </text>
                );
              }}
              className="text-gray-400"
              domain={[0, maxValue + 10000]}
              ticks={[0, maxValue + 10000]}
            />
            <Tooltip
              content={<CustomTooltip theme={theme} />}
              cursor={{
                stroke: "#F66720",
                strokeWidth: 0.5,
                strokeDasharray: "3 3",
              }}
            />{" "}
            <Area
              type={cardinal}
              strokeLinejoin="miter"
              strokeLinecap="butt"
              dataKey="prevValue"
              stroke="#2A2A2A"
              strokeWidth={2.3}
              fill="url(#colorGradient2)"
              dot={false}
              activeDot={false}
            />
            <Area
              type={cardinal}
              strokeLinejoin="miter"
              strokeLinecap="butt"
              dataKey="value"
              stroke="#F66720"
              strokeWidth={2.3}
              fill="url(#colorGradient)"
              dot={false}
              activeDot={{
                r: 2,
                fill: "#ff6b35",
                stroke: "#ff6b35",
                strokeWidth: 2,
              }}
            />
            {/* <Line
              type="linear"
              dataKey="value"
              stroke="#ffffff"
              dot={<CustomDot />}
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* </div> */}
    </div>
  );
};

export default FinancialChart;
