import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
const Stack = createStackNavigator();
const MenuScreens = () => {
  const { user } = useAuth();
  const Hello = user?.user && user?.token;
  console.log("hello", Hello);
  const authonaticatedUser = user?.user && user?.token;
  return (
    <Stack.Navigator initialRouteName="Login">
      {authonaticatedUser ? (
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              headerShown: false,
            }}
            component={SignUpScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MenuScreens;
