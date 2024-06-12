import 'react-native-gesture-handler';
import  React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext, useAuth } from './src/contexts/AuthProvider';
import LoginScreen from './src/components/LoginScreen';
import HomeScreen from './src/components/HomeScreen';
import { ActivityIndicator, View } from 'react-native';
import SignUpScreen from './src/components/SignUpScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
     <AuthProvider>
         <Navigation />
    </AuthProvider> 
     
  );
}

const Navigation = () => {
  const {isAuthenticated,loading} = useAuth();

  useEffect(()=>{
    // check if user is authonticated or not
    console.log("kfdkj",isAuthenticated,loading)
  },[isAuthenticated,loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}   screenOptions={{
        headerShown: false, 
      }}>
          {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
