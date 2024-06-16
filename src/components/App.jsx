import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import VectorIcon from "../utils/VectorIcon";
import HomeScreen from "./HomeScreen";
import PostScreen from "./PostScreen";
import AboutScreen from "./AboutScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconType;

            if (route.name === "Home") {
              iconType = "Ionicons";
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "About") {
              iconType = "Ionicons";
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            } else if (route.name === "Post") {
              iconType = "Ionicons";
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Profile") {
              iconType = "FontAwesome";
              iconName = focused ? "user-circle" : "user-circle-o";
            }

            return (
              <VectorIcon
                type={iconType}
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}
