import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { user, setUser } = useAuth();
  // const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@auth");
    setUser({ user: null, token: "" });
    // navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
