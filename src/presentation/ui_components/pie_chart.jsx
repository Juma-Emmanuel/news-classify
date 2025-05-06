"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useArticles } from "../../data/repos/articles";
export default function PieChartComponent() {
  const { articles } = useArticles();
  const total2 = articles.length;
  const categoryCounts = articles.reduce((acc, article) => {
    const category = article.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categoryCounts).map(([category, count]) => ({
    label: category,
    value: ((count / total2) * 100).toFixed(2),
  }));
  const parsedData = data.map((item) => ({
    ...item,
    valueNumber: Number.parseFloat(item.value),
  }));

  // Colors for each segment
  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

  const renderCustomizedLabel = ({ cx, cy }) => {
    return (
      <g>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-bold text-2xl"
        >
          {total2}
        </text>
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-gray-500 text-sm"
        >
          Articles
        </text>
      </g>
    );
  };

  return (
    <div className="w-90 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Article Distribution
      </h2>
      <p className="text-sm text-muted-foreground">
        {" "}
        Classification breakdown by topic
      </p>

      <div className="h-80 w-50">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={parsedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              innerRadius="50%"
              fill="#8884d8"
              dataKey="valueNumber"
            >
              {parsedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {parsedData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-4 h-4 mr-2 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="font-medium">{entry.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
