import React, { createContext, useState, useEffect, useContext } from "react";
import { firebase } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stop the loading state after 3 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Function to initialize user from AsyncStorage
    const initializeUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      console.log("refresh call")
      if (storedUser) {
        setUser(JSON.parse(storedUser));

        setIsAuthenticated(true);
        console.log("refresh call iiiiiiiiiiiiin")
      } else {
        setIsAuthenticated(false);
      }
    };

    initializeUser();

    // Set up auth state change listener
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      console.log("login me triger");
      if (user) {
        const userData = {
          userId: user.uid,
          email: user.email,
          username: '', 
          profileUrl: '',
        };

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        console.log("login me triger innnnnnnnnnn")
      } else {
        const storedUser = await AsyncStorage.getItem('user');
        if (!storedUser) {
          await AsyncStorage.removeItem('user')
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    });

    // Clean up the subscription on unmount
    return () => {
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return { success: true, data: user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/user-not-found)")) msg = "User not found!";
      if (msg.includes("(auth/network-request-failed)")) msg = "Check your internet.and try again";
      if (msg.includes("(auth/wrong-password)")) msg = "Incorrect password!";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email!";
      if (msg.includes("(auth/invalid-credential)")) msg = "Invalid-credential";
      return { success: false, data: msg };
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem('user')
      return { success: true };
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

      // const userData = {
      //   userId: user.uid,
      //   email: user.email,
      //   username,
      //   profileUrl,
      // };
      // await AsyncStorage.setItem('user', JSON.stringify(userData));
      // // setUser(userData);
      // setIsAuthenticated(true);
      return { success: true, data: user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email!";
      if (msg.includes("(auth/weak-password)")) msg = "Please enter a strong password!";
      if (msg.includes("(auth/email-already-in-use)")) msg = "The email address is already in use";

      return { success: false, data: msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
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
