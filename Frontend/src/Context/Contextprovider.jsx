import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const authContext = createContext();

const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout",{}, { withCredentials: true }); 
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, skipping verifyUser");
        return;
      }
      try {
        const res = await api.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else [setUser(null)];
      } catch (error) {
        console.error("Error in verifyuser", error);
      }
    };

    verifyUser();
  }, []);
  
  return (
    <authContext.Provider value={{ user, login, logout, navigate }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default Contextprovider;
