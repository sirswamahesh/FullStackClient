import { View, Text } from "react-native";
import React from "react";
import Header from "./Header";

const AboutScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "center" }}>
      <Header />
      <Text>AboutScreen</Text>
    </View>
  );
};

export default AboutScreen;
