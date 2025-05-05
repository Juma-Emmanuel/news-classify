"use client";

import { useEffect, useRef } from "react";

export default function TopicDistribution() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Data for the pie chart
    const data = [
      { label: "Politics", value: 32, color: "#f43f5e" },
      { label: "Technology", value: 28, color: "#f59e0b" },
      { label: "Sports", value: 24, color: "#10b981" },
      { label: "Entertainment", value: 16, color: "#0ea5e9" },
    ];

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Set canvas dimensions
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Draw the pie chart
    let startAngle = 0;

    data.forEach((item) => {
      // Calculate the angle for this slice
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      // Draw the slice
      ctx.beginPath();
      ctx.moveTo(size / 2, size / 2);
      ctx.arc(
        size / 2,
        size / 2,
        size / 2 - 10,
        startAngle,
        startAngle + sliceAngle
      );
      ctx.closePath();

      // Fill with the slice color
      ctx.fillStyle = item.color;
      ctx.fill();

      // Update the starting angle for the next slice
      startAngle += sliceAngle;
    });

    // Draw a white circle in the middle for a donut chart effect
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 4, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // Add text in the center
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(`${total}`, size / 2, size / 2 - 10);
    ctx.font = "12px sans-serif";
    ctx.fillText("Articles", size / 2, size / 2 + 10);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width="200" height="200" className="max-w-full" />
      <div className="grid grid-cols-2 gap-2 mt-4 w-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <span className="text-sm">Politics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm">Technology</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm">Sports</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-500"></div>
          <span className="text-sm">Entertainment</span>
        </div>
      </div>
    </div>
  );
}
