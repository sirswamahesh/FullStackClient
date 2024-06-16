import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import VectorIcon from "../utils/VectorIcon";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { user, setUser, setAuthonaticated } = useAuth();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@auth");
    setUser({ user: null, token: "" });
    setAuthonaticated(false);
    // navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Full Stack App</Text>
      <TouchableOpacity onPress={handleLogout}>
        <VectorIcon type="AntDesign" name="logout" color="gray" size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    elevation: 10,
  },
  appTitle: {
    fontSize: 19,
    // color: "B",
  },
});

export default Header;
