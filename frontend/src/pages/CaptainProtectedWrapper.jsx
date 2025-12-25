import { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { captain, setCaptain} =  useContext(CaptainDataContext);
  const [isLoading, setIsLoading ] =  useState(true);

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        navigate("/captain-login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/captains/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setCaptain(data.captain);
          setIsLoading(false);
        } else {
          navigate("/captain-login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptain, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;