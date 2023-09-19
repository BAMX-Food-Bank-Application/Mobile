import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {auth} from '../../../config/FirebaseConnection';

import {SafeAreaView} from 'react-native-safe-area-context';


const Registration = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [name, setName] = useState('');
  const [nameCorp, setNameCorp] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  
  const dev = false;

  const handleSignUp = async () => {
    if(!dev){
      const emailRegex = /^\S+@\S+\.(com|mx|org|net)$/
      const nameRegex = /^[a-zA-Z]+(([',.-][a-zA-Z])?[ a-zA-Z]*)*$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      // We start validation

      // Check if everything is filled
      if (name === '' || email === '' || password === '' || passwordC === '') {
        Alert.alert('Campos vacíos', 'Por favor llena todos los campos');
        return false;
      }
      // Check if name is valid
      if (!nameRegex.test(name)) {
        Alert.alert('Nombre inválido', 'El nombre ingresado no es válido');
        return false;
      }
      // Check if email is valid
      if (!emailRegex.test(email)) {
        Alert.alert('Correo inválido', 'El correo ingresado no es válido');
        return false;
      }
      // Check if phone number is valid

      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phoneNumber)) {
        Alert.alert('Número de teléfono inválido', 'El número de teléfono ingresado no es válido');
        return false;
      }

      // Check if password is valid
      if (!passwordRegex.test(password)) {
        Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
        return false;
      }
      if (password !== passwordC) {
        Alert.alert('Contraseñas no coinciden', 'Las contraseñas no coinciden');
        return false;
      }
    }
    else{
      console.log('Dev mode');
      setName('Dev');
      setEmail('geekdeer@gmail.com');
      setPhoneNumber('1234567890');
      setPassword('Dev123456');
      setNameCorp('DevCorp');
      setAddress('DevAddress');
    }   

    // If everything is valid, we proceed to create the user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Creating user data in firestore
        console.log('User created: '+ userCredential.user.uid);
        
        firestore().collection('userData').doc(userCredential.user.uid).set({
          name: name,
          nameCorp: nameCorp,
          address: address,
          phoneNumber: Number(phoneNumber), 
          status: Boolean (false),         
        })

        .then(() => {
          // Sending email verification to the user
          console.log('User data added');
          sendEmailVerification(userCredential.user)
          .catch((error) => {
            console.log('Error sending email verification: ', error);
          });
        }
        )
        .catch((error) => {
          console.log('Error adding user data to firestore: ', error);
        });        
      })
      .catch((error) => {
        console.log('Error creating user: ', error);
      });
    };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.arrowbtn}>
          <Image
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
                style={styles.arrow}
                />
        </TouchableOpacity>
        <View
          style={{alignItems: 'center', display: 'flex', marginHorizontal: 32}}>
          <View style={styles.logocon}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=cb9d7322-205e-448f-9288-24e81fe46bf5',
              }}
              style={styles.logo}
            />
          </View>
          <TextInput
            placeholder="Nombre Completo *"
            style={styles.input}
            onChangeText={setName}
            autoCapitalize={'words'}></TextInput>
          <TextInput
            placeholder="Correo *"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize={'none'}
            keyboardType={'email-address'}></TextInput>
          <TextInput
            placeholder="Nombre de Empresa *"
            style={styles.input}
            onChangeText={setNameCorp}
            autoCapitalize={'none'}></TextInput>
          <TextInput
            placeholder="Ubicación de la Empresa *"
            style={styles.input}
            onChangeText={setAddress}
            autoCapitalize={'none'}></TextInput>
          <TextInput
            placeholder="Número de teléfono *"
            style={styles.input}
            maxLength={10}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType={'phone-pad'}></TextInput>
          <TextInput
            placeholder="Contraseña *"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}></TextInput>
          <TextInput
            placeholder="Confirmar contraseña *"
            value={passwordC}
            secureTextEntry
            onChangeText={setPasswordC}
            style={styles.input}></TextInput>
          <TouchableOpacity
            style={[styles.button, {marginRight: 16}]}
            onPress={handleSignUp}>
            <Text style={styles.poppinsmedium} >Registrarse</Text>
          </TouchableOpacity>
          <View style={[styles.flexRow]}>
            <Text style={[styles.flex]}>Ya tienes una cuenta? </Text>
            <TouchableOpacity
              style={[styles.flex]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.linkedText]}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  logocon:{
    width: 200,
    height: 300,
  },
  logo: {
    width: '100%',
    height: '100%',
    marginBottom: 16,
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowbtn: {
    width: 24,
    height: 24,
    alignSelf: 'flex-start',
    marginTop: 30,
    marginHorizontal: 24,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginTop: 16,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  flexRow: {
    display: 'flex',
    margin: 10,
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
  },
  linkedText: {
    color: '#E8042C',
    fontFamily: 'Poppins-Medium', 
  },
  poppinsregular: {
    fontFamily: 'Poppins-Regular', 
  },
  poppinsmedium: {
    fontFamily: 'Poppins-Medium', 
    fontSize: 16,
    color: 'black',
  },
});

export default Registration;
