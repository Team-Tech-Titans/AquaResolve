import {setStatusBarHidden, StatusBar} from 'expo-status-bar';
import {Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import problem from '../assets/problem.png';
import feed from '../assets/feed.png';
import history from '../assets/history.png';
import account from '../assets/account.png';
import { useRoute } from '@react-navigation/native';

export default function HomePage({navigation}) {
    const route = useRoute();

    const changeActiveNav = () => {
        console.log(route.name)
    }

    return (
        <SafeAreaView style={styles.container}>
            {/*<StatusBar />*/}
            <View style={styles.bottomContainer}>
                <Pressable style={styles.optionContainer} onPress={() => navigation.navigate("Home")}>
                    <View style={styles.activeOptionImageContainer}>
                        <Image source={problem} />
                    </View>
                    <Text style={styles.optionText}>New Problem</Text>
                </Pressable>
                <Pressable style={styles.optionContainer} onPress={() => navigation.navigate("History")}>
                    <View style={styles.optionImageContainer}>
                        <Image source={history} />
                    </View>
                    <Text style={styles.optionText}>History</Text>
                </Pressable>
                <Pressable style={styles.optionContainer} onPress={() => navigation.navigate("Login")}>
                    <View style={styles.optionImageContainer}>
                        <Image source={account} />
                    </View>
                    <Text style={styles.optionText}>Account</Text>
                </Pressable>
                {/*<View>*/}
                {/*    <View>*/}
                {/*        <Image source={feed} />*/}
                {/*    </View>*/}
                {/*    <Text>Feed</Text>*/}
                {/*</View>*/}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    bottomContainer: {
        height: 70,
        width: '100%',
        backgroundColor: '#A9D6E5',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        flex: 1,
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
        opacity: .7,
    },
    activeOptionImageContainer: {
        height: 32,
        width: 55,
        paddingTop: 2,
        paddingLeft: 15,
        borderRadius: 20,
        backgroundColor: '#ecf8f7',
    },
    optionText: {
        marginTop: 3,
        fontSize: 12,
        opacity: .7,
        fontFamily: 'Poppins-Regular',
    },
});
