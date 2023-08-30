import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from '@react-native-firebase/app';
import {auth} from '../config/FirebaseConnection';
import {firestore} from '@react-native-firebase/firestore';

export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => {
      if (user) {
        if(user.emailVerified){
          setUser(user);
        }
      }
      else{
        console.log('Nao nao amigao');
      }
    });
    console.log('hooker: '+ user);
    return unSub;
  }, []);
  return {user};
}
