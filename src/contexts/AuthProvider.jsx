import React, { createContext, useState, useEffect, useContext } from "react";
import { firebase } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading ,setLoading] = useState(true)
  useEffect(() => {
    const initializeUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        setLoading(false)
      }
    };

    initializeUser();

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userData = {
          userId: user.uid,
          email: user.email,
          username: '', // Update with actual username if available
          profileUrl: '', // Update with actual profileUrl if available
        };

        const storedUser = await AsyncStorage.getItem('user');
        if (!storedUser) {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        }

        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await firebase.firestore().collection('allusers').doc(user.uid).set({
        username,
        profileUrl,
        userId: user.uid,
      });

      const userData = {
        userId: user.uid,
        email: user.email,
        username,
        profileUrl,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, data: user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email!";
      if (msg.includes("(auth/weak-password)")) msg = "Please enter a strong password!";
      if (msg.includes("(auth/email-already-in-use)")) msg = "The email address is already in use";
      console.log(msg);

      return { success: false, data: msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
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
