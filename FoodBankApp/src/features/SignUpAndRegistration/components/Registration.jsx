import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Registration = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  return (
    <View style={styles.screen}>
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
                <Text>Registrarse</Text>
            </TouchableOpacity>
            <Text>Ya tienes una cuenta?  Ingresar</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EFEFEF',
        fontFamily: 'Poppins',
      },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 16,
      },
      input: {
        width: '100%',
        borderBottomWidth: 1,
        padding: 10,
      },
      button: {
        marginTop: 16,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
      }
});

export default Registration;