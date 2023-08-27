// Core
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// UI
import {Text, TouchableOpacity, Alert} from 'react-native';

// Firebase
import app from '../../../config/FirebaseConnection';
import {getAuth} from 'firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const auth = getAuth(app);

  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
      return true;
    } catch (error) {
      Alert.alert('No pudimos cerrar tu sesion');
      return false;
    }
  };

  return (
    <SafeAreaView>
      <Text>Welcome to the Home Screen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
