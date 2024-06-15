import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
const Stack = createStackNavigator();
const MenuScreens = () => {
  const { authonaticated, loading } = useAuth();
  // const authonaticatedUser = user?.user && user?.token;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      {authonaticated ? (
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
