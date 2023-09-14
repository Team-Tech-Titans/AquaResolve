import {Pressable, StyleSheet, Text, TextInput, View, Image, Button, SafeAreaView} from 'react-native';
import TopBar from '../components/TopBar.js';
import BottomBar from '../components/BottomBar.js';
import user from '../assets/user.png';
import edit from '../assets/edit.png';
import location from '../assets/location.png';
import {useNavigation} from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

function AccountPage() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.mainContainer}>
        <TopBar />
            <View style={styles.container}>
                <Text style={styles.greeting}>Account</Text>
                <Text style={styles.problemContainerTitle}>Manage your account here</Text>
                <View style={styles.accountInfo}>
                    <View style={styles.accountPictureContainer}>
                        <Image style={styles.accountPicture} source={user}/>
                    </View>
                    <View style={styles.accountName}>
                        <Text style={styles.userName}>Samarth Singh Bachhotiya</Text>
                    </View>
                    <View style={styles.accountCity}>
                        <Image source={location} style={styles.locationIcon}/>
                        <Text style={styles.locationName}>Bhopal, Madhya Pradesh</Text>
                    </View>
                    <Pressable style={styles.editInfo}>
                        <Text style={styles.editText}>Edit info</Text>
                        <Image style={styles.editIcon} source={edit}/>
                    </Pressable>
                </View>
            </View>
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
        width: '100%',
        height: '100%',
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
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    problemContainerTitle: {
        color: '#888',
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
        paddingLeft: 30,
    },
    accountInfo: {
        flex: .33,
        alignItems: 'center',
        marginTop: 30,
        marginLeft: -30,
    },
    accountPictureContainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        overflow: 'hidden',
    },
    accountPicture: {
        height: '100%',
        width: '100%',
    },
    accountCity: {
        flex: 1,
        flexDirection: 'row',
    },
    accountName: {
        marginTop: 10,
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
    userName: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    editInfo: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2A6F97',
        borderRadius: 50,
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
    editIcon: {
        height: 16,
        width: 16,
    },
    editText: {
        fontFamily: 'Poppins-Regular',
        marginRight: 8,
    }
});

export default AccountPage;