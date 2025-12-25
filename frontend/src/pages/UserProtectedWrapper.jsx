import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading ] =  useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }  
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile`,
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
          setUser(data.user);
          setIsLoading(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>{children}</>
  )
}

export default UserProtectedWrapper