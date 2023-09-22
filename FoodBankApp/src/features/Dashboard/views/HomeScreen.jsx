// Core
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// UI
import {Text, TouchableOpacity, Alert, View} from 'react-native';

// Firebase
import app from '../../../config/FirebaseConnection';
import {getAuth} from 'firebase/auth';
import NewRequest from '../components/NewRequest';
import ShipmentsComponent from '../components/ShipmentsComponent';

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
    <View style={{paddingHorizontal: 16}}>
    <ShipmentsComponent/>
        <NewRequest/>
        <TouchableOpacity onPress={signOut} style={{opacity:0}}>
          <Text>Cerrar sesion</Text>
        </TouchableOpacity>
    </View>  
    );
};

export default HomeScreen;
