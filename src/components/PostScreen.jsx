import { View, Text } from "react-native";
import React from "react";
import Header from "./Header";

const PostScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "center" }}>
      <Header />
      <Text>PostScreen</Text>
    </View>
  );
};

export default PostScreen;
