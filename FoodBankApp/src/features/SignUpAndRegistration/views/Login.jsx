// Base
import React, {useState} from 'react';

// UI
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// Components
import DefaultAlert from '../../Global/components/DefaultAlert';
import Button from '../../Global/components/Button';
import Logo from '../../Global/components/Logo';

// Utils
import { validateEmail, validatePassword } from '../../Global/utils/regexValidation';

// Styles
import Colors from '../../Global/styles/Colors';

// Navigator
import { useNavigation } from '@react-navigation/native';

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../../config/FirebaseConnection';
import firestore from '@react-native-firebase/firestore';
import DefaultStyles from '../../Global/styles/Defaults';

const auth = getAuth(app);

const Login = () => {

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState (''); 

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  
  const navigation = useNavigation();

  const alertTrigger = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message)
    setShowAlert(!showAlert);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!validateEmail(email)){
      alertTrigger('Correo inválido', 'El correo ingresado no es válido')
      return;
    }
    if (!validatePassword(password)){
      alertTrigger('Contraseña inválida', 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      // Check if status is true in firestore
      const user = userCredential.user;
      const check2 = user.emailVerified;

      if (check2) navigation.navigate('Confirmation');
      else if (!check2) navigation.navigate('Email');
    })
    .catch(error => {
      // Handle authentication error
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        // Invalid email
        alertTrigger('Correo inválido', 'El correo ingresado no es válido')
      } else if (errorCode === 'auth/wrong-password') {
        // Incorrect password
        alertTrigger('Contraseña incorrecta', 'La contraseña ingresada es incorrecta');
      } else if (errorCode === 'auth/user-not-found') {
        // User not found
        alertTrigger('Usuario no encontrado', 'El usuario ingresado no existe');
      } else if(errorCode === 'auth/missing-password'){
        // Password missing
        alertTrigger('Contraseña no ingresada', 'Por favor ingresa una contraseña');
      } else if(errorCode === 'auth/network-request-failed'){
        alertTrigger('Sin conexión', 'Por favor conectate a internet para continuar');
      }
      else {
        // Other error cases
        alertTrigger('Error', errorMessage)
      }
    });
    setLoading(false);
  }

  return (
      <LinearGradient
        colors={[Colors.gradientPrimary, Colors.gradientSecondary]}
        style={styles.linearGradient}>
        <SafeAreaView style={[DefaultStyles.screen, {backgroundColor: null}]}>
          <View style={{alignItems: 'center', display: 'flex'}}>
            <Logo/>
            <TextInput
              autoCapitalize='none'
              placeholder="Email"
              placeholderTextColor={Colors.textDisabled}
              style={[isFocused ? styles.inputFocused : styles.input, DefaultStyles.poppinsRegular]}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              value={email} onChangeText={setEmail}
              >
            </TextInput>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={Colors.textDisabled}
              style={[isFocused2 ? styles.inputFocused : styles.input, DefaultStyles.poppinsRegular]}
              onFocus={() => {
                setIsFocused2(true);
              }}
              onBlur={() => {
                setIsFocused2(false);
              }}
              secureTextEntry
              value={password} onChangeText={setPassword}
              ></TextInput>
          </View>
          <View style={styles.buttons}>

            <Button content='Login' functionality = { () => handleLogin() } bgColor={'white'} fontColor={Colors.textPrimary} ></Button>

          </View>
          <View style={[DefaultStyles.flexColumn, {marginVertical: 32, rowGap: 16}]}>
            <TouchableOpacity onPress={() => navigation.navigate('Password')}>
              <Text style={[styles.linkedText, {color:'white'}]}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SingleDonation')}>
              <Text style={[styles.linkedText, {color:'white'}]}>¿Quieres donar? Contáctanos</Text>
            </TouchableOpacity>
          </View>
          <DefaultAlert alertTitle = {alertTitle} alertContent = {alertMessage} btnContent='Ok' modalVisible={showAlert} onHide={ () => alertTrigger() } />
        </SafeAreaView>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    width: '100%',
    marginVertical: 12,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    paddingHorizontal: 24,
    elevation: 15,
  },
  inputFocused: {
    width: '100%',
    marginVertical: 12,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: 'rgba(67, 58, 194, .5)',
    borderStyle: 'solid',
    borderRadius: 25,
    paddingHorizontal: 24,
  },
  buttons: {
    alignSelf: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 32,
    gap: 8,
  }
});
export default Login;