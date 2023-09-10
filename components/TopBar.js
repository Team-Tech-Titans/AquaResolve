import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View} from 'react-native';
import icon from '../assets/logoSmall.png';
import { useFonts } from 'expo-font';
import poppinsRegular from '../assets/fonts/Poppins-Regular.ttf';

export default function HomePage() {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': poppinsRegular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/*<StatusBar/>*/}
            <View style={styles.topBarContainer}>
                <View style={styles.logoContainer}>
                    <Image source={icon} />
                </View>
                <Text style={styles.topbarTitle}>AquaResolve</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    topBarContainer: {
        height: 60,
        width: '100%',
        backgroundColor: '#A9D6E5',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topbarTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    logoContainer: {
        backgroundColor: '#fff',
        padding: 6,
        height: 44,
        width: 44,
        borderRadius: 50,
        marginRight: 10,
    },
});
