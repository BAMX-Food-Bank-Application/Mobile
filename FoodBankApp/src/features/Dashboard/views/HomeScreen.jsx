// Core
import React from 'react';
// UI
import {Text, TouchableOpacity, Alert, SafeAreaView} from 'react-native';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';

// Firebase
import app from '../../../config/FirebaseConnection';
import {getAuth} from 'firebase/auth';
import NewRequest from '../components/NewRequest';
import ShipmentsComponent from '../components/ShipmentsComponent';

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
    <SafeAreaView style={[DefaultStyles.Screen, {paddingHorizontal: 16}]}>
      <ShipmentsComponent/>
      <NewRequest/>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={[DefaultStyles.poppinsTitle, {margin:24}]}>LogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails')}>
        <Text style={[DefaultStyles.poppinsTitle, {margin:24}]}>Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
