import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { auth, db } from '../config/FirebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';


async function loadData() {
  const user = auth.currentUser.uid;
  const userData = await firestore().collection('userData').doc(user).get();
  return userData;
}

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {

      if (userAuth !== null) {
        setUser(userAuth);
        loadData().then((data) => {  
            if(data.data.status === false) navigation.navigate('Wait');
          else if(data.data.status === true) navigation.navigate('Home');
        }).catch((error) => {
            console.log('Error: ', error);
          });
        
        } else {
          setUser(null);
        }
      
    });
    return () => unsubscribe();
  }, []);


  return { user };
}

