import React, { createContext, useState, useEffect } from 'react';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
            AsyncStorage.setItem('user', JSON.stringify(user));
          } else {
            setUser(null);
            AsyncStorage.removeItem('user');
          }
          setLoading(false);
        });
      }
      setLoading(false);
    };

    checkUser();

    return () => firebase.auth().onAuthStateChanged(() => {});
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      setUser(user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      setUser(user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error("Logout Error:", error);
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
