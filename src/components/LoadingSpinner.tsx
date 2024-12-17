// LoadingSpinner.tsx
"use client";

import React from "react";
import { Ring } from "react-awesome-spinners";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Ring size={64} color="#3498db" />
    </div>
  );
};

export default LoadingSpinner;
