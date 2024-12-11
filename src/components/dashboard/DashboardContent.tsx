import React from "react";

const DashboardContent = () => {
  return (
    <div className="max-w-full w-full lg:w-6/6 bg-white shadow-md rounded-lg p-6 lg:p-8 self-end">
      <h1 className="text-xl lg:text-3xl font-bold text-center lg:text-left">
        Welcome to your Dashboard
      </h1>
      <p className="text-gray-600 mt-4 text-sm lg:text-base text-center lg:text-left">
        This is the main content area. Add your widgets, charts, or other important information here.
      </p>
      <div className="flex flex-wrap justify-between mt-8 gap-4 lg:space-x-6">
        <div className="w-full lg:flex-1 bg-gray-200 h-20 lg:h-32 rounded-md text-center flex items-center justify-center">
          Widget 1
        </div>
        <div className="w-full lg:flex-1 bg-gray-200 h-20 lg:h-32 rounded-md text-center flex items-center justify-center">
          Widget 2
        </div>
        <div className="w-full lg:flex-1 bg-gray-200 h-20 lg:h-32 rounded-md text-center flex items-center justify-center">
          Widget 3
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
