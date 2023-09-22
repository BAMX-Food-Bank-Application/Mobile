import React, {useState} from 'react';

// UI
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//Components
import DefaultAlert from '../../Global/components/DefaultAlert';
import Button from '../../Global/components/Button';
import Logo from '../../Global/components/Logo';

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
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState ('');
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  
  const navigation = useNavigation();

  const navRegistration = () => {
    navigation.navigate('Registration');
  };

  const alertTrigger = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message)
    setShowAlert(!showAlert);
  };


  const handleLogin = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      // Check if status is true in firestore
      const user = userCredential.user;
      const userData = await firestore().collection('userData').doc(user.uid).get();
      const check1 = userData.data().status;
      const check2 = user.emailVerified;

      if (check1 && check2) navigation.navigate('HomeScreen');
      else if (!check1) navigation.navigate('Wait');
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
      <View style={styles.screen}>
        <View style={{alignItems: 'center', display: 'flex', marginHorizontal: 32,}}>
          <Logo/>
          <TextInput
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
        <View style={[styles.buttons, {gap: 16}]}>

          <Button content='Registrarse' functionality = { () => navRegistration() } bgColor={'white'} fontColor={Colors.textPrimary} ></Button>
          <Button content='Login' functionality = { () => handleLogin() } bgColor={'white'} fontColor={Colors.textPrimary} ></Button>

        </View>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Password')}>
          <Text style={[styles.linkedText]}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <DefaultAlert alertTitle = {alertTitle} alertContent = {alertMessage} btnContent='Ok' modalVisible={showAlert} onHide={ () => alertTrigger() } />
        
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    background:
      'linear-gradient(0deg, rgba(243,178,70,.8) 0%, rgba(224,30,64,.8) 100%)',
  },
  input: {
    width: '100%',
    margin: 12,
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
    margin: 12,
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
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  linkedText: {
    color: 'white',
    fontFamily: 'Poppins-Regular', 
    alignSelf: 'center',
  },
  link: {
    marginTop: 32,
    marginHorizontal: 90,
  }
});
export default Login;