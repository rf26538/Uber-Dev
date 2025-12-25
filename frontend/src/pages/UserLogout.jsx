import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
