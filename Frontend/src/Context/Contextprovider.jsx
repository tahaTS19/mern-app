import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const authContext = createContext();

const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("token");
    setUser(null);
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

  //auto logout on token expiry func
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decodedToken.exp < currentTime) {
        logout(); // Token already expired
      } else {
        const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
        const timer = setTimeout(() => {
          logout(); // Auto logout when token expires
          toast.error("Session Timed Out..");
        }, timeUntilExpiry);

        return () => clearTimeout(timer); // cleanup if component unmounts
      }
    } catch (error) {
      console.error("Failed to decode token", error);
      logout();
    }
  }, [user]); // run again if user changes

  return (
    <authContext.Provider value={{ user, login, logout, navigate }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default Contextprovider;