import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Wait = ( {route} ) => {
  const {email, name, password, phoneNumber} = route.params
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.arrowbtn}>
        <Image
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
              style={styles.arrow}
              />
      </TouchableOpacity>
      <View style = {styles.container}>
        <Image
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fprocessing.png?alt=media&token=7cb7b032-ccef-463b-96c8-ce7d0a2a6446',
            }}
            style={styles.logo}
        />
        <View style={styles.texts}>
            <Text style={styles.message}>Espera</Text>
            <Text style={styles.text}>El Banco de Alimentos está revisando tu solicitud de registro</Text>
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