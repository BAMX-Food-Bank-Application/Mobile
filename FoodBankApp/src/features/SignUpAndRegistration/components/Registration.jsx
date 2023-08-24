import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Registration = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  return (
    <View style={styles.screen}>
        <Image
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
            style={styles.arrow}
            />
        <View style={{alignItems: 'center', display: 'flex', marginHorizontal: 32,}}>
            <Image
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=cb9d7322-205e-448f-9288-24e81fe46bf5'}}
            style={styles.logo}
            />
            <TextInput placeholder='Nombre Completo *' style={styles.input}>
            </TextInput>
            <TextInput placeholder='Email *' style={styles.input}>
            </TextInput>
            <TextInput placeholder='Número de teléfono *' style={styles.input}>
            </TextInput>
            <TextInput placeholder='Contraseña *' style={styles.input}>
            </TextInput>
            <TextInput placeholder='Confirmar contraseña *' style={styles.input}>
            </TextInput>
            <TouchableOpacity style={[styles.button, {marginRight: 16}]}>
                <Text style={styles.poppinsmedium}>Registrarse</Text>
            </TouchableOpacity>
            <Text style={styles.question}>Ya tienes una cuenta?  Ingresar</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EFEFEF',
      },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 16,
      },
      arrow: {
        width: 24,
        height: 24,
        marginHorizontal: 24,
      },
      input: {
        width: '100%',
        borderBottomWidth: 1,
        padding: 10,
        fontFamily: 'Poppins-Regular',
      },
      button: {
        marginTop: 32,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
      },
      poppinsregular: {
        fontFamily: 'Poppins-Regular', 
      },
      poppinsmedium: {
        fontFamily: 'Poppins-Medium', 
        fontSize: 16,
        color: 'black',
      },
      question: {
        fontFamily: 'Poppins-Medium', 
        fontSize: 12,
        color: 'black',
        marginTop: 16,
      },
});

export default Registration;