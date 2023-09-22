import {Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView, Button, SafeAreaView} from 'react-native';
import TopBar from '../components/TopBar.js';
import BottomBar from '../components/BottomBar.js';
import newIcon from '../assets/new.png';
import location from '../assets/location.png';
import {useNavigation} from "@react-navigation/native";
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import {  collection, addDoc, db, storage, uploadBytes, ref, standardUserAuth, getAuth, updateProfile, updatePhoneNumber, signInWithEmailAndPassword, initializeApp, getReactNativePersistence, onAuthStateChanged, createUserWithEmailAndPassword, signOut  } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Loading from '../components/Loading';




function HomePage() {
    const navigation = useNavigation();
    const [locationCoordinates, setLocationCoordinates] = useState([]);
    const [locationDetails, setLocationDetails] = useState('');
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [isLocationInputFocused, setLocationInputFocused] = useState(false);
    const [displayName, setDisplayName] = useState('Test');
    const [email, setEmail] = useState('example@email.com');
    const [phoneNumber, setPhoneNumber] = useState('9876543210');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageState, setImageState] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseState, setResponseState] = useState('');
    
    useEffect(() => {
        onAuthStateChanged(standardUserAuth, (user) => {
          if (user !== null) {
            setDisplayName(user.displayName);
            setEmail(user.email);
            // setPhoneNumber(user.phoneNumber);
          }
        });
      }, []);


      // const handleImageClick = () => {
      //   alert("Image can't be uploaded for now, feature on the way!")
      // }


      const pickImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
          });
      
          if (!result.canceled && result.assets.length > 0) {
            const base64Data = await convertToBase64(result.assets[0].uri);
            return base64Data;
          } else {
            console.warn('No image selected or image selection canceled');
            return null;
          }
        } catch (error) {
          console.error('Error picking an image:', error);
          return null;
        }
      };
      
      const convertToBase64 = async (imageUri) => {
        try {
          if (!imageUri) {
            console.error('Invalid image URI');
            throw new Error('Invalid image URI');
          }
      
          const base64Data = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          console.log(base64Data);
          return base64Data;
        } catch (error) {
          console.error('Error converting to base64:', error);
          throw error;
        }
      };
      
      const handleImageClick = async () => {
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          console.log('Media library permission status:', status);
      
          if (status !== 'granted') {
            alert('Permission to access media library denied');
          } else {
            const imageBase64Data = await pickImage();
      
            if (imageBase64Data) {
              await uploadImage(imageBase64Data);
            } else {
              console.error('Image upload failed');
              alert('Image upload failed. Please try again.');
            }
          }
        } catch (error) {
          console.error('Error handling image:', error);
          alert('An error occurred while handling the image. Please try again.');
        }
      };
      const uploadImage = async (imageBase64Data) => {
        const base64Image = imageBase64Data;
        setImageState(base64Image);
      };
      
      
      
      
    const submitData = async () => {
      setIsLoading(true);
        try {
            const docRef = await addDoc(collection(db, "data"), {
              userName: displayName,
              email: email,
              phoneNumber: phoneNumber,
              location: locationDetails,
              problemDescription: description,
              coordinates: locationCoordinates,
              image: imageState,
              city: "Bhopal",
            });
            setIsLoading(false);
            alert("Problem submitted succesfully")
          } catch (e) {
            console.error(e);
            setIsLoading(false);
            alert("Error submitting problem");
          }
    }
      


    const getUserLocation = async () => {
      while (locationCoordinates.length === 0 || locationCoordinates.includes(undefined)) {
          try {
            setTimeout(async () => {
              const location = await Location.getCurrentPositionAsync({});
              console.log(locationCoordinates)
            }, 500)
            setLocationCoordinates([location.coords.latitude, location.coords.longitude]);
          } catch (error) {
              setLocationCoordinates('Error getting location, tap to try again');
          }
      }
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
      
        if (status !== 'granted') {
          alert('Location permission denied');
          return;
        }
      
        getUserLocation();
      };
      
      const getLocationDetails = async (latitude, longitude) => {
        setLocationDetails('Getting your location...');
        await getLocation();
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );
              console.log("Response: ", response);
              setResponseState(response);
          
              if (response.ok) {
                const locationData = await response.json();
                console.log(locationData);
                const displayName = locationData.display_name;
                console.log(displayName)
                setLocationDetails(displayName);
              } else {
                setLocationDetails('hehe');
              }
            } catch (error) {
              console.error('Error fetching location details:', error);
              setLocationDetails('Error fetching location, tap to try again.');
            }
    }
  
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
              {isLoading &&
                <Loading  />
              }
            <Text style={styles.greeting}>Hi {displayName}!</Text>
            <Text style={styles.problemContainerTitle}>Enter your problem details</Text>
            <View style={styles.problemContainer}>
                <TextInput
                multiline={true}
                placeholder="Describe your problem here"
                onChangeText={(text) => setDescription(text)}
                style={styles.textInput}
                onFocus={handleTextInputFocus} />
                <Pressable
                    style={styles.locationContainer} onPress={() => getLocationDetails(locationCoordinates[0], locationCoordinates[1])}>
                    <TextInput
                    multiline={true}
                    placeholder="Tap to get your location"
                    style={styles.location}
                    onFocus={handleLocationInputFocus}
                    value={locationDetails}
                    editable={false}
                    />
                </Pressable>
                <Pressable onPress={handleImageClick} style={styles.cameraButton}>
                    <Image style={styles.cameraImage} source={newIcon} />
                    <Text style={styles.cameraText}>Add a new image for your problem</Text>
                </Pressable>
                <Pressable onPress={submitData} style={styles.buttonStyle}>
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
        overflow: 'hidden',
    },
    textInput: {
        height: 100,
        backgroundColor: '#e7e6e6',
        width: '90%',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        padding: 16,
        fontFamily: 'Poppins-Regular',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    locationContainer: {
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#e7e6e6',
        width: '90%',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    location: {
        fontFamily: 'Poppins-Regular',
        color: '#000',
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