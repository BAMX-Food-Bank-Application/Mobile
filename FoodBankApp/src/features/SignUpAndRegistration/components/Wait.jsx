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
import  firestore  from '@react-native-firebase/firestore';
import { auth } from '../../../config/FirebaseConnection';


const Wait = () => {
  const navigation = useNavigation();
  

    const checkVerification = async () => {

        try{
          const signUpRequest = AsyncStorage.getItem('SignUpRequest');
          console.log('Current user: ', auth.currentUser.uid);
          const UID = auth.currentUser.uid;
          const verification = (await firestore().collection('userData').doc(UID).get()).data().status;
          
          AsyncStorage.setItem('SignUpRequest', 'true');

          if (signUpRequest && verification) {
            // Item exists, remove it
            AsyncStorage.removeItem('SignUpRequest');
            navigation.navigate('Email');
          } else {
            setTimeout(() => {
              console.log('Waiting for verification');
              checkVerification();
            }, 10000);
          }
        }
        catch (error){
          console.log('Error checking verification: ', error);
        }    
      
    };
  

  checkVerification();

  return (
    <View style={styles.screen}>
      
      <View style = {styles.container}>
        <Image
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fprocessing.png?alt=media&token=7cb7b032-ccef-463b-96c8-ce7d0a2a6446',
            }}
            style={styles.logo}
        />
        <View style={styles.texts}>
            <Text style={styles.message}>Espere</Text>
            <Text style={styles.text}>El Banco de Alimentos está revisando tu solicitud de registro.</Text>
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

export default Wait;