import { StyleSheet, Text, View } from 'react-native';
import HomePage from './screens/HomePage';
import {useFonts} from "expo-font";
import poppinsRegular from "./assets/fonts/Poppins-Regular.ttf";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': poppinsRegular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <HomePage />
    </View>
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