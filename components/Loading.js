import loadingGif from '../assets/loading.gif';
import {Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView, Button, SafeAreaView} from 'react-native';

export default function Loading() {
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.loading} source={loadingGif} />
            </View>
        </View>
        )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        opacity: .75,
        zIndex: 10,
        position: 'absolute',
        height: '120%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
    },
    imageContainer: {
        borderRadius: 100,
        height: 75,
        width: 75,
        overflow: 'hidden',
    },
    loading: {
        height: 75,
        width: 75,
    },
});