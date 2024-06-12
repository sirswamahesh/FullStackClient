import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthProvider';
import {firebase} from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const { logout,user } = useAuth();
  


const [userData, setUserData] = useState(null);

useEffect(() => {
  let isMounted = true;

  const fetchUserData = async () => {
    try {
      if (user?.userId && isMounted) {
        const userDoc = await firebase.firestore().collection("allusers").doc(user.userId).get();
        if (isMounted) {
          const data = userDoc.data();
          const userData = {
            username : data?.username,
            profileUrl:data?.profileUrl,
            email:user?.email,
            userId:data?.userId
            }
          setUserData(userData);
        
          await AsyncStorage.setItem("user",JSON.stringify(userData))
          console.log(data, "data");
        }
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error fetching user data: ", error);
      }
    }
  };

  fetchUserData();

  // Cleanup function
  return () => {
    isMounted = false;
  };
}, [user?.userId]);
console.log("userrrrrrr",userData)
const logOut =async ()=>{
  const res = await logout();
  if(res?.success){
    Alert.alert("LogOut","Successfully!");
  }
}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>{userData?.email}</Text>
      <Text style={styles.text}>{userData?.username}</Text>
      <Text style={styles.text}>{userData?.profileUrl}</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
