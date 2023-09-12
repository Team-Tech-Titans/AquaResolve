import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Login({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <Text
                style={{fontSize:40,textAlign:'center',margin:15,fontWeight:'bold'}}
            > Log In
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Username'>
            </TextInput>

            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry>
            </TextInput>

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={()=> navigation.navigate('Signup')}
                >
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={()=> navigation.navigate('Home')}
                >
                    <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'powderblue',
    },
    heading:{
        fontSize:30,
        textAlign:'center',
        margin:10
    },
    input:{
        width:'90%',
        backgroundColor:'white',
        padding: 15,
        marginBottom:10,
        borderRadius:10

    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        alignItems:'center',
        marginTop:15
    },
    userBtn:{
        backgroundColor:'cadetblue',
        padding:15,
        width:'45%',
        marginBottom:10,
        borderRadius:5
    },
    btnText:{
        fontSize:16,
        textAlign:'center',
    }
})