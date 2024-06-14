import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ user: null, token: "" });

  useEffect(() => {
    // Function to initialize user from AsyncStorage
    const initializeUser = async () => {
      const storedUser = await AsyncStorage.getItem("@auth");
      const data = await JSON.parse(storedUser);
      console.log("user data", data);
      setUser({ ...user, user: data?.user, token: data?.token });
    };
    initializeUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
