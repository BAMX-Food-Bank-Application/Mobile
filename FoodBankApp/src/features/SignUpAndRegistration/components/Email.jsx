import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import  firestore  from '@react-native-firebase/firestore';
import { auth } from '../../../config/FirebaseConnection';





const Email = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      
      <View style = {styles.container}>
        <Image
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcorreo.png?alt=media&token=59f6425b-3305-4f4d-91a2-847e83610de8',
            }}
            style={styles.logo}
        />
        <View style={styles.texts}>
            <Text style={styles.message}>Ya casi!</Text>
            <Text style={styles.text}>Se ha enviado un correo de confirmación, por favor revise su bandeja de entrada.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 16,
        marginTop: 80
      },
      arrow: {
        width: 24,
        height: 24,
      },
      arrowbtn: {
        width: 24,
        height: 24,
        marginHorizontal: 24,
      },
      container: {
        alignItems: 'center',
      },
      message: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 36,
        color: 'black',
      },
      text: {
        marginTop: 50,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: 'black',
        marginHorizontal: 8,
      },
      texts: {
        marginTop: 60,
        alignItems: 'center',
      }
});

export default Email;