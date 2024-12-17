"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import LoadingSpinner from "@/components/LoadingSpinner";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Decode the token to check the role
        const decodedToken = jwt.decode(token);

        if (decodedToken && typeof decodedToken === "object") {
          const userRole = decodedToken.role;

          if (userRole === 1) {
            setIsAuthorized(true);
          } else {
            router.push("/dashboard"); // Redirect non-admin users to dashboard
          }
        } else {
          throw new Error("Invalid token structure");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        router.push("/login"); // Redirect to login page
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthorized) {
    return null; // Prevent rendering content for unauthorized users
  }

  return <>{children}</>;
};

export default AuthCheck;
