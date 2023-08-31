// Core
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// UI
import {Text, TouchableOpacity, Alert} from 'react-native';

// Firebase
import app from '../../../config/FirebaseConnection';
import {getAuth, signOut} from 'firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const auth = getAuth(app);

  const navigation = useNavigation();

  const handleSignOut = async() => {
    signOut(auth).
      then(() => {
        // Sign-out successful.
        navigation.navigate('Login')
        console.log('User signed out');
      }
      ).catch((error) => {
        // An error happened.
        console.log('Error signing out', error);
      });
    };

  return (
    <SafeAreaView>
      <Text>Welcome to the Home Screen</Text>
      <TouchableOpacity onPress={() => handleSignOut()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
