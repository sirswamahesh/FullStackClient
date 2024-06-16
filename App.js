import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import MenuScreens from "./src/components/MenuScreens";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="red" />
        <MenuScreens />
      </NavigationContainer>
    </AuthProvider>
  );
}
