import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardView from "../utils/CustomKeyboardView";

export default function App() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigation = useNavigation();
  const handleSignIn = () => {
    if(!email || !password){
      alert("Sign In , Please fill all the fields.")
    }
    console.log("Sign In button pressed");
    console.log(email,password)
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password pressed");
  };

  const handleSignUp = () => {
    // Handle sign up navigation or logic here
    navigation.navigate("SignUp");
    console.log("Sign Up pressed");
  };

  return (
    <CustomKeyboardView>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/login.png")} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View style={styles.formContainer}>
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
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(value)=>setEmail(value)}
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
            onChangeText={(value)=>setPassword(value)}
          />
        </View>
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp} >
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    marginTop:50,
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Background color
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "600",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%", // Adjust the width as needed
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    color: "black",
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#2980b9",
  },
  signupTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  signupText: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: 16,
  },
  signupButton: {
    color: "#2980b9",
    fontSize: 16,
    fontWeight: "500",
  },
});
