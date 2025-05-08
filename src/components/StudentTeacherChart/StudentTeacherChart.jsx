import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Python", value: 15 },
  { name: "Bootcamp", value: 10 },
  { name: "Cloud Computing", value: 8 },
  { name: "Front-End", value: 5 },
  { name: "App Security", value: 4 },
];

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#845EC2"];

const SubjectTeacherPieChart = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2 className="text-3xl font-bold text-cyan-700">
        Teacher Distribution by Subject
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectTeacherPieChart;
