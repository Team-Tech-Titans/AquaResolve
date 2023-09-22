    import { initializeApp } from "firebase/app";
    import { getAuth, updateProfile, updatePhoneNumber, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
    import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
    import { getStorage, ref, uploadBytes } from "firebase/storage";
    import { getFirestore, collection, addDoc } from "firebase/firestore";

    const standardUserConfig = {
        apiKey: "AIzaSyAUWF6msXBjl2sCZRwWoeOe2lVk46X9O9c",
        authDomain: "aquaresolve-466f2.firebaseapp.com",
        projectId: "aquaresolve-466f2",
        storageBucket: "aquaresolve-466f2.appspot.com",
        messagingSenderId: "148309252297",
        appId: "1:148309252297:web:a359f833b4de611ee39518",
        measurementId: "G-6RR8L0EMZX"
    };
    
    const adminUserConfig = {
        apiKey: "AIzaSyC9tQvdlXj06JFycMdHjyB_g0ji_Usu7QI",
        authDomain: "aquaresolveadmin.firebaseapp.com",
        projectId: "aquaresolveadmin",
        storageBucket: "aquaresolveadmin.appspot.com",
        messagingSenderId: "457411429974",
        appId: "1:457411429974:web:5b3d7edec1790ff4839df7",
        measurementId: "G-2QWQZELLLQ"
    };

    const standardUserApp = initializeApp(standardUserConfig, "standardUserApp");

    const standardUserAuth = initializeAuth(standardUserApp, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    
    const adminUserApp = initializeApp(adminUserConfig, "adminUserApp");

    const adminUserAuth = initializeAuth(adminUserApp, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    
    const storage = getStorage(standardUserApp);
    const db = getFirestore(standardUserApp);

    export { collection, addDoc, db, storage, uploadBytes, ref, standardUserAuth, adminUserAuth, getAuth, updateProfile, updatePhoneNumber, signInWithEmailAndPassword, initializeApp, getReactNativePersistence, onAuthStateChanged, createUserWithEmailAndPassword, signOut };