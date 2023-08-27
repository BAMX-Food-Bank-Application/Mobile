import React, {useState} from 'react';

// UI
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Navigator
import { useNavigation } from '@react-navigation/native';

// Firebase
import app from '../../../config/FirebaseConnection'
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { GoogleSignin, statusCodes } from '@reac-native-google-signin/google-signin'; // WIP


const auth = getAuth(app);

const Login = () => {

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState ('');

  const navigation = useNavigation();


    const handleLogin = async () => {
    if(email && password){
      try {
        const user = signInWithEmailAndPassword(auth, email, password);
        if(user){
            navigation.navigate('Home');
        }
        else{
            Alert.alert('Wrong answer dude');
        }
      } catch (error) {
        Alert.alert('Error code: ', error.message);
      }
    }
  };

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
            style={isFocused ? styles.inputFocused : styles.input}
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
            style={isFocused2 ? styles.inputFocused : styles.input}
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
            <Text>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text>Ingresar</Text>
          </TouchableOpacity>
        </View>
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
    fontFamily: 'Poppins',
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
});
export default Login;