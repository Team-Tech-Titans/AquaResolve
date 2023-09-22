import {Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView, Button, SafeAreaView} from 'react-native';
import TopBar from '../components/TopBar.js';
import BottomBar from '../components/BottomBar.js';
import newIcon from '../../assets/new.png';
import location from '../../assets/location.png';
import {useNavigation} from "@react-navigation/native";
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { collection, addDoc, db, query, where, getDocs, storage, ref, uploadBytes, adminUserAuth, signOut, onAuthStateChanged } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';



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
    const [city, setCity] = useState('Bhopal');
    const [stateName, setStateName] = useState('Madhya Pradesh');
    const [results, setResults] = useState([]);

    useEffect(() => {
      onAuthStateChanged(adminUserAuth, (user) => {
        if (user !== null) {
          setDisplayName(user.displayName);
          setEmail(user.email);
          // setPhoneNumber(user.phoneNumber);
        }
      });
    
      (async () => {
        try {
          const dataCollectionRef = collection(db, 'data');
          const q = query(dataCollectionRef, where('city', '==', 'Bhopal'));
          const querySnapshot = await getDocs(q);
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setResults(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }, []);
      

    const getUserLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          setLocationCoordinates([location.coords.latitude, location.coords.longitude]);
        } catch (error) {
            setLocationCoordinates('Error getting location, tap to try again');
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
      
          if (response.ok) {
            const locationData = await response.json();
            console.log(locationData);
            const displayName = locationData.display_name;
            console.log(displayName)
            setLocationDetails(displayName);
          } else {
            setLocationDetails('Error fetching location, tap to try again.');
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
          setLocationDetails('Error fetching location, tap to try again.');
        }
      };
  
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
            <Text style={styles.greeting}>Hey {displayName},</Text>
            <Text style={styles.problemContainerTitle}>Here are some water problems near you</Text>
            <View style={styles.accountCity}>
                        <Image source={location} style={styles.locationIcon}/>
                        <Text style={styles.locationName}>{city}, {stateName}</Text>
                    </View>
            <View style={styles.problemContainer}>
              {results.length > 0 ? (
                <View style={styles.problemContainer}>
                  {results.map(element => (
                    <View style={styles.problemCard} key={element.id}>
                    <View style={styles.problemCardImageContainer}>
                      <Image style={{height: '100%', width: '100%'}} source={{uri: 'data:image/jpeg;base64,'+element.image}} />
                    </View>
                    <View style={styles.problemCardInfo}>
                        <View style={styles.problemCardTitle}><Text style={styles.problemText}>{element.problemDescription}</Text></View>
                        <View style={styles.problemCardLocation}><Text style={styles.problemText}>{element.location}</Text></View>
                        <View style={styles.problemCardUsername}><Text style={styles.problemText}>{element.userName}</Text></View>
                    </View>
                    </View>
                  ))}
                </View>
              ) : (
                <Text>Loading...</Text>
              )}
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
    accountCity: {
        flexDirection: 'row',
        marginBottom: 22,
        marginLeft: 30,
        marginTop: 6,
    },
    locationIcon: {
        height: 15,
        width: 15,
        marginRight: 5,
        opacity: .6,
        marginTop: 1,
    },
    locationName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#999',
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
    },
    problemText: {
      fontFamily: 'Poppins-Regular',
    },
    problemContainer: {
        flex: 1,
        marginLeft: -20,
        alignItems: 'center',
        paddingBottom: 60,
        marginTop: 4,
    },
    problemContainerTitle: {
        color: '#888',
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
        paddingLeft: 30,
    },
    problemCard: {
        height: 200,
        width: 340,
        backgroundColor: '#ddd',
        borderRadius: 12,
        marginBottom: 15,
        overflow: 'hidden',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    problemCardImageContainer: {
        height: 200,
        width: 100,
        // backgroundColor: '#eee',
    },
    problemCardInfo: {
        marginLeft: 10,
    },
    problemCardTitle: {
        height: 100,
        width: 210,
        marginBottom: 10,
        borderRadius: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
    },
    problemCardLocation: {
        height: 20,
        width: 200,
        // backgroundColor: '#bbb',
        borderRadius: 20,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 10,
    },
    problemCardUsername: {
        height: 20,
        width: 200,
        // backgroundColor: '#bbb',
        borderRadius: 20,
        paddingLeft: 10,
        fontSize: 10,
    },
});

export default HomePage;