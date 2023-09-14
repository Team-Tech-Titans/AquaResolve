import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';

import problem from '../assets/problem.png';
import history from '../assets/history.png';
import account from '../assets/account.png';

export default function BottomBar({ navigation }) {
  const route = useRoute();
  const [activeOption, setActiveOption] = useState('Home');

  useEffect(() => {
    console.log(route.name);
    setActiveOption(route.name);
  }, [route.name]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.optionContainer} onPress={() => navigation.navigate('Home')}>
          <View style={[styles.optionImageContainer, activeOption === 'Home' && styles.activeOptionImageContainer]}>
            <Image source={problem} />
          </View>
          <Text style={styles.optionText}>New Problem</Text>
        </Pressable>
        <Pressable style={styles.optionContainer} onPress={() => navigation.navigate('History')}>
          <View style={[styles.optionImageContainer, activeOption === 'History' && styles.activeOptionImageContainer]}>
            <Image source={history} />
          </View>
          <Text style={styles.optionText}>History</Text>
        </Pressable>
        <Pressable style={styles.optionContainer} onPress={() => navigation.navigate('Account')}>
          <View style={[styles.optionImageContainer, activeOption === 'Account' && styles.activeOptionImageContainer]}>
            <Image source={account} />
          </View>
          <Text style={styles.optionText}>Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  bottomContainer: {
    height: 70,
    width: '100%',
    backgroundColor: '#A9D6E5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImageContainer: {
    height: 32,
    width: 55,
    paddingTop: 2,
    paddingLeft: 15,
    borderRadius: 20,
    opacity: 0.7,
  },
  activeOptionImageContainer: {
    height: 32,
    width: 55,
    paddingTop: 2,
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: '#ecf8f7',
    opacity: 1,
  },
  optionText: {
    marginTop: 3,
    fontSize: 12,
    opacity: 0.7,
    fontFamily: 'Poppins-Regular',
  },
});
