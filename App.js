import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import MenuScreens from "./src/components/MenuScreens";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MenuScreens />
      </AuthProvider>
    </NavigationContainer>
  );
}
