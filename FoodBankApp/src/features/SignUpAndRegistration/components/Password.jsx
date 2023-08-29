import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Password = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.arrowbtn}>
        <Image
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
              style={styles.arrow}
              />
      </TouchableOpacity>
      <View style = {styles.container}>
        <Text style={styles.message}>Restaurar contraseña</Text>
        <Text style={styles.text}>Ingresa el correo con el que te registraste en la app</Text>
      </View>
        <View style={styles.inputs}>
            <TextInput
            placeholder="Correo"
            style={styles.input}
            onChangeText={setEmail}
            autoCapitalize={'words'}></TextInput>
        </View>
        <TouchableOpacity
          style={[styles.button, {marginRight: 16}]}
          >
          <Text style={styles.poppinsmedium} >Continuar</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
    },
      arrow: {
        width: 24,
        height: 24,
      },
      arrowbtn: {
        width: 24,
        height: 24,
        marginHorizontal: 24,
        alignSelf: 'flex-start',
        marginTop: 40,
      },
      container: {
        alignItems: 'center',
        marginTop: 32,
      },
      message: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 24,
        color: 'black',
      },
      text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: 'black',
      },
      input: {
        width: '100%',
        borderBottomWidth: 1,
        padding: 10,
        fontFamily: 'Poppins-Regular',  
      },
      inputs: {
        display: 'flex',
        marginTop: 32,
        width: '80%',
      },
      button: {
        marginTop: 32,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
      },
      poppinsmedium: {
        fontFamily: 'Poppins-Medium', 
        fontSize: 16,
        color: 'black',
      },
});

export default Password;