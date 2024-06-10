import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthProvider';

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Log Out" onPress={logout} />
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
