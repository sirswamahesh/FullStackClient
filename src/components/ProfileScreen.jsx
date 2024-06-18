import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Header from "./Header";
import VectorIcon from "../utils/VectorIcon";
import CustomKeyboardView from "../utils/CustomKeyboardView";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, setUser, setAuthonaticated } = useAuth();
  const [email, setEmail] = useState(user?.user?.email);
  const [password, setPassword] = useState(user?.user?.password);
  const [name, setName] = useState(user?.user?.name);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(user?.user?._id);
  const navigation = useNavigation();

  // Handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        _id: id,
        name,
        password,
        email,
      });
      setLoading(false);

      if (data && data.message) {
        Alert.alert('Success', data.message, [
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem("@auth");
              setAuthonaticated(false);
              navigation.navigate("Login"); 
          }
      }]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      Alert.alert("Error", errorMessage);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            <Text style={{textAlign:"center"}}>Currently you can update only username , email and password *</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <VectorIcon
              type="Feather"
              name="user"
              size={20}
              color="rgba(0,0,0,0.7)"
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(0,0,0,0.7)"
              style={styles.input}
              value={name}
              onChangeText={(value) => setName(value)}
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
              value={email}
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
              value={password}
              style={styles.input}
              onChangeText={(value) => setPassword(value)}
            />
          </View>

          <TouchableOpacity onPress={handleUpdate} style={styles.updateProfile}>
            {loading ? <ActivityIndicator /> : <Text style={styles.updateProfileText}>Update profile</Text>}
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
    width:"90%",
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
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateProfile: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  updateProfileText: {
    color: "white",
  },
});

export default ProfileScreen;
