import { StyleSheet, Text, View, BackHandler, Platform } from 'react-native';
import React,{ useState, useEffect } from 'react';
import HomePage from './screens/HomePage';
import History from './screens/HistoryPage';
import Account from './screens/AccountPage';
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import {useFonts} from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import poppinsSemiBold from "./assets/fonts/Poppins-SemiBold.ttf";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {decode, encode} from 'base-64';
import adminLogin from './admin/screens/Login';
import adminHomePage from './admin/screens/HomePage';
import adminAccount from './admin/screens/AccountPage';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}


const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': poppinsRegular,
    'Poppins-SemiBold': poppinsSemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                  name="Home"
                  component={HomePage}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="adminHome"
                  component={adminHomePage}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="History"
                  component={History}
                  options={{ headerShown: false, animationEnabled: false }}
              />
              <Stack.Screen
                  name="Account"
                  component={Account}
                  options={{ headerShown: false, animationEnabled: false }}
              />
              <Stack.Screen
                  name="adminAccount"
                  component={adminAccount}
                  options={{ headerShown: false, animationEnabled: false }}
              />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="adminLogin"
                component={adminLogin}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Signup"
                component={SignUp}
                options={{headerShown: false}}
            />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
  },
});