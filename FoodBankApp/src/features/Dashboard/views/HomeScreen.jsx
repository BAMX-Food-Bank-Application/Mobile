// Core
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// UI
import {Text, TouchableOpacity, Alert} from 'react-native';

// Firebase
import app from '../../../config/FirebaseConnection';
import {getAuth} from 'firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewRequest from '../components/NewRequest';

const HomeScreen = ({ navigation }) => {
  const auth = getAuth(app);


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
      <NewRequest></NewRequest>
      <TouchableOpacity onPress={ () =>  navigation.navigate('RequestDetails', { docID: 'ZcS3GokgeN7F0oxbLKsj'})}>
        <Text>Request details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
