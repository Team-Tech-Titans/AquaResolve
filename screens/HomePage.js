import {Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView, Button, SafeAreaView} from 'react-native';
import TopBar from '../components/TopBar.js';
import BottomBar from '../components/BottomBar.js';
import newIcon from '../assets/new.png';
import location from '../assets/location.png';
import {useNavigation} from "@react-navigation/native";
import { useState } from 'react';

function HomePage() {
    const navigation = useNavigation();
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [isLocationInputFocused, setLocationInputFocused] = useState(false);
  
    const handleLocationInputFocus = () => {
      setKeyboardOffset(-120);
      setLocationInputFocused(true);
    };
    const handleTextInputFocus = () => {
      setKeyboardOffset(120);
    };
    return (
        <SafeAreaView
        style={styles.mainContainer}>
            <TopBar />
            <ScrollView style={styles.container}>
            <Text style={styles.greeting}>Hi Samarth!</Text>
            <Text style={styles.problemContainerTitle}>Enter your problem details</Text>
            <View style={styles.problemContainer}>
                <TextInput
                multiline={true}
                placeholder="Describe your problem here"
                style={styles.textInput}
                onFocus={handleTextInputFocus} />
                <TextInput
                multiline={true}
                placeholder="Choose your location"
                style={styles.locationContainer}
                onFocus={handleLocationInputFocus}
                />
                <Pressable style={styles.cameraButton}>
                <Image style={styles.cameraImage} source={newIcon} />
                <Text style={styles.cameraText}>Add a new image for your problem</Text>
                </Pressable>
                <Pressable style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 88,
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: '#fff',
        margin: 15,
        marginTop: 24,
        flex: 1,
        width: '100%',
    },
    greeting: {
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 30,
        paddingTop: 20,
    },
    problemContainer: {
        width: '92%',
        height: '60%',
        padding: 10,
        paddingLeft: 15,
        alignItems: 'center',
        paddingTop: 20,
    },
    problemContainerTitle: {
        color: '#888',
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
        paddingLeft: 30,
    },
    textInput: {
        height: 100,
        backgroundColor: '#e7e6e6',
        width: '90%',
        borderRadius: 14,
        padding: 16,
        fontFamily: 'Poppins-Regular',
    },
    locationContainer: {
        marginTop: 10,
        height: 50,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#e7e6e6',
        width: '90%',
        fontFamily: 'Poppins-Regular',
        borderRadius: 14,
    },
    cameraButton: {
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    cameraImage: {
        opacity: .4,
        marginBottom: 20,
    },
    cameraText: {
        opacity: .5,
        fontSize: 12,
    },
    buttonStyle: {
        width: '90%',
        height: 50,
        backgroundColor: '#2A6F97',
        borderRadius: 40,
        flex: .08,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    }
});

export default HomePage;