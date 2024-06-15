import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboardView from "../utils/CustomKeyboardView";

export default function SignUpScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setname] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleSignUp = async () => {
    if (!email || !password || !name) {
      alert("Sign In , Please fill all the fields.");
    }

    const { data } = await axios.post("/auth/register", {
      email,
      password,
      name,
    });
    alert(data && data.message);
    setname("");
    setEmail("");
    setPassword("");
    navigation.navigate("Login");
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <CustomKeyboardView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/register.png")}
            style={styles.logo}
          />
        </View>
        <View>
          <Text style={styles.title}>Sign Up</Text>
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
              autoCapitalize="none"
              style={styles.input}
              onChangeText={(value) => setname(value)}
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
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={(value) => setEmail(value)}
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
              onChangeText={(value) => setPassword(value)}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignUp}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signupButton}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    paddingVertical: 10,
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
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
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
