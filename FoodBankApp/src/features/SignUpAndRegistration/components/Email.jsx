import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';


import {useNavigation} from '@react-navigation/native';
import { auth } from '../../../config/FirebaseConnection';





const Email = () => {
  const navigation = useNavigation();

  const checkMail = async () => {
    // get current user if email is verified
    const user = auth.currentUser;
    if(user.emailVerified){
      try {
       navigation.navigate('Confirmation');
       console.log('YAY');
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      // if email is not verified, wait 5 seconds and check again
      setTimeout(() => {
        auth.currentUser.reload();
        checkMail();
      }, 5000);
    }
  };

  checkMail();
  return (
    <View style={styles.screen}>
      
      <View style = {styles.container}>
        <Image
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2FsentEmail.png?alt=media&token=16517312-d681-4682-8ac0-41676115b8d0',
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