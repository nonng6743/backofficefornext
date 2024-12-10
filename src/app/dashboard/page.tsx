import AuthCheck from "@/components/dashboard/AuthCheck";
import Dashboard from "@/components/dashboard/Dashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <AuthCheck>
      <Dashboard />
    </AuthCheck>
  );
};

export default DashboardPage;
