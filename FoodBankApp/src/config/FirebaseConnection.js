// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, initializeRecaptchaConfig } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "@react-native-firebase/auth";
import {} from "@react-native-firebase/app-check"

firebase.appCheck().initializeAppCheck;

const firebaseConfig = {
  apiKey: "AIzaSyBi6WlKLtdRi9GS6vjusbwXG2AasyebRA0",
  authDomain: "bamx-cc64f.firebaseapp.com",
  projectId: "bamx-cc64f",
  storageBucket: "bamx-cc64f.appspot.com",
  messagingSenderId: "1043818646012",
  appId: "1:1043818646012:web:c849d93665de5b5f154a79",
  measurementId: "G-310W5CYEM6",
  forceRecaptchaFlowForTesting: true,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.appCheck().initializeAppCheck({ provider: rnfbProvider, isTokenAutoRefreshEnabled: true });



export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
initializeRecaptchaConfig(auth)
export default app;