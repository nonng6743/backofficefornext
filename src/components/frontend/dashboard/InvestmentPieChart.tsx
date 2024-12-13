"use client";

import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const InvestmentPieChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Stocks", "Bonds", "Real Estate", "Cryptocurrency"],
        datasets: [
          {
            label: "Portfolio Distribution",
            data: [40000, 20000, 30000, 10000], // Example data (values in currency)
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow flexible resizing
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
              },
              padding: 10,
              usePointStyle: true, // Add point style for better appearance
              boxWidth: 10,
              generateLabels: (chart) => {
                const data = chart.data;
                if (
                  data.labels &&
                  Array.isArray(data.datasets[0].backgroundColor)
                ) {
                  return data.labels.map((label, index) => ({
                    text: `${label}: $${data.datasets[0].data[index]}`,
                    fillStyle: (
                      data.datasets[0].backgroundColor as string[]
                    )[index],
                  }));
                }
                return [];
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const label = context.label || "";
                return `${label}: $${value}`;
              },
            },
          },
        },
      },
    });

    // Cleanup function to destroy chart instance on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg mt-28 p-6">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Investment Portfolio
        </h2>
        {/* Container for Responsive Chart */}
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default InvestmentPieChart;
