// Base
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

// UI
import { View, Text, TouchableOpacity } from 'react-native';


// Firebase
import app from '../../../config/FirebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
const auth = getAuth(app);


const HomeScreen = () => {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully.');
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
