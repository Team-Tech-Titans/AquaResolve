import { StyleSheet, Text, View } from 'react-native';
import HomePage from './screens/HomePage';
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import {useFonts} from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': poppinsRegular,
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
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Signup"
              component={SignUp}
              options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    // <View style={styles.container}>
    //   <HomePage />
    // </View>
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