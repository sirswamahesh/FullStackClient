import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authonaticated, setAuthonaticated] = useState(false);
  const [user, setUser] = useState({ user: null, token: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // Function to initialize user from AsyncStorage
    const initializeUser = async () => {
      const storedUser = await AsyncStorage.getItem("@auth");

      if (storedUser) {
        setAuthonaticated(true);
        const data = JSON.parse(storedUser);
        console.log("user data", data);
        setUser({ ...user, user: data?.user, token: data?.token });
      }
    };
    initializeUser();
  }, []);

  axios.defaults.baseURL = "https://fullstackappserver.onrender.com/api/v1";
  return (
    <AuthContext.Provider
      value={{ user, setUser, authonaticated, setAuthonaticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
