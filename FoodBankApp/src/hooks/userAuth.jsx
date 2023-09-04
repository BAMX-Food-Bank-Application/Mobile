import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { auth } from '../config/FirebaseConnection';


export async function loadData(user) {
  const userData = await firestore().collection('userData').doc(user).get();
  return userData;
}

// Check if user has phone otp verified
export async function checkPhone(user) {
  return user.phoneVerified;
}

// Check if user has email verified
export async function checkEmail(user) {
  return user.emailVerified;
}

// Check if user's status is true
export async function checkStatus(user) {
  return user.status;
}

export default function userAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      setUser(auth.currentUser);
      if (user) {
          console.log('User logged: ', user.uid);
        } 
      else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return { user };
}

