import React, {useState} from 'react';

// UI
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Navigator
import { useNavigation } from '@react-navigation/native';

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../../config/FirebaseConnection';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(app);

const Login = () => {

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState ('');
  
  const navigation = useNavigation();
  
  const checkPersistence = async () => {
    try {
      const req = await AsyncStorage.getItem('SignUpRequest');
      const e = await AsyncStorage.getItem('e');
      const p = await AsyncStorage.getItem('p');


      if (req !== null && e !== null && p !== null) {
        console.log('SignUpRequest: ', req ? 'true' : 'false');

        signInWithEmailAndPassword(auth, e.substring(1, e.length - 1), p.substring(1, p.length - 1)).then(x => {navigation.navigate('Wait'); }).catch(error => { console.log('Patata: ', error)});
      }
      else{
        return false;
      }
    } catch (error) {
      console.log('Error with async storage: ', error)
    }
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Check if status is true in firestore
      const user = userCredential.user;
      const userData = firestore().collection('userData').doc(user.uid).get();
      if(userData.status === true){
        // Check if email is verified
        if(user.emailVerified === true){
          // Check if phone is verified
          if(user.phoneVerified === true){
            // Navigate to home
            navigation.navigate('HomeScreen');
          }
          else{
            // Navigate to phone verification
            navigation.navigate('Phone');
          }
        }
        else{
          // Navigate to email verification
          navigation.navigate('Email');
        }
      }
      else{
        // Navigate to wait
        navigation.navigate('Wait');
      }
    })
    .catch(error => {
      // Handle authentication error
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        // Invalid email
        Alert.alert('Correo inválido', 'El correo ingresado no es válido');
      } else if (errorCode === 'auth/wrong-password') {
        // Incorrect password
        Alert.alert('Contraseña incorrecta', 'La contraseña ingresada es incorrecta');
      } else if (errorCode === 'auth/user-not-found') {
        // User not found
        Alert.alert('Usuario no encontrado', 'El usuario ingresado no existe');
      } else if(errorCode === 'auth/missing-password'){
        // Password missing
        Alert.alert('Contraseña no ingresada', 'Por favor ingresa una contraseña');
      }
      else {
        // Other error cases
        Alert.alert('Error', errorMessage);
      }
    
    });
  }

  checkPersistence();

  return (
    <LinearGradient
      colors={['#f3b246', '#e01e40']}
      style={styles.linearGradient}>
      <View style={styles.screen}>
        <View style={{alignItems: 'center', display: 'flex', marginHorizontal: 32,}}>
          <Image
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=bb2f494f-d3dc-41bc-87f7-b677e0e966d7'}}
            style={styles.logo}
          />
          <TextInput
            placeholder="Email"
            style={[isFocused ? styles.inputFocused : styles.input, styles.poppinsregular]}
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
            style={[isFocused2 ? styles.inputFocused : styles.input, styles.poppinsregular]}
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
          <TouchableOpacity style={[styles.button, {marginRight: 16}]} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.poppinsmedium}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.poppinsmedium}>Ingresar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Password')}>
          <Text style={[styles.linkedText]}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
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
  button: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 10,
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
  poppinsregular: {
    fontFamily: 'Poppins-Regular', 
  },
  poppinsmedium: {
    fontFamily: 'Poppins-Medium', 
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