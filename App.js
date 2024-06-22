import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import MenuScreens from "./src/components/MenuScreens";
import { StatusBar } from "react-native";
import { PostProvider } from "./src/contexts/PostContext";

export default function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="skyblue" />
          <MenuScreens />
        </NavigationContainer>
      </PostProvider>
    </AuthProvider>
  );
}
