import React, {useState} from 'react';
import AppNavigation from './src/navigation/appNavigation';
<<<<<<< Updated upstream
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateRequest from './src/features/Dashboard/components/CreateRequest';
import {auth} from './src/config/FirebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

const __DEV__ = true;

if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  AsyncStorage.clear();
}
else{
  const e = "geekdeer@gmail.com";
  const p = "Patata123"
  signInWithEmailAndPassword(auth, e, p);
}

>>>>>>> Stashed changes

const App = () => {

  

  return(
    <AppNavigation></AppNavigation>
  );
};

export default App;
