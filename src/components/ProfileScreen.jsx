import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "./Header";
import VectorIcon from "../utils/VectorIcon";
import CustomKeyboardView from "../utils/CustomKeyboardView";
import { useAuth } from "../contexts/AuthContext";

const ProfileScreen = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <View style={{ flex: 1, justifyContent: "top" }}>
      <Header />
      <CustomKeyboardView style={{ flex: 1, borderWidth: 2 }}>
        <View style={styles.profileImg}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
            }}
            width={200}
            height={200}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <VectorIcon
              type="FontAwesome"
              name="user"
              size={20}
              color="rgba(0,0,0,0.7)"
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(0,0,0,0.7)"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <VectorIcon
              type="Octicons"
              name="mail"
              size={20}
              color="rgba(0,0,0,0.7)"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(0,0,0,0.7)"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <VectorIcon
              type="Feather"
              name="lock"
              size={20}
              color="rgba(0,0,0,0.7)"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(0,0,0,0.7)"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.updateProfile}>Update profile</Text>
          </TouchableOpacity>
        </View>
      </CustomKeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImg: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    color: "black",
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 50,
    width: "80%",
  },
  formContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    // width: "90%", // Adjust the width as needed
  },
  updateProfile: {
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
