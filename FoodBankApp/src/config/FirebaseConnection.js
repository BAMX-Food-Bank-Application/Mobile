// Import the functions you need from the SDKs you need
import { initializeApp } from "@react-native-firebase/app";
import { getFirestore } from "@react-native-firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence  } from '@react-native-firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBi6WlKLtdRi9GS6vjusbwXG2AasyebRA0",
  authDomain: "bamx-cc64f.firebaseapp.com",
  projectId: "bamx-cc64f",
  storageBucket: "bamx-cc64f.appspot.com",
  messagingSenderId: "1043818646012",
  appId: "1:1043818646012:web:c849d93665de5b5f154a79",
  measurementId: "G-310W5CYEM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
console.log(auth);
export default app;