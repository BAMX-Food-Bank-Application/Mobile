import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Initialize Firebase
import app from '../../../config/FirebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const auth = getAuth(app);

const Registration = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState ('');
  const [passwordC, setPasswordC] = useState ('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState ('');

  const handleSignUp = async () => {
    if(email && password){
      try {
      // User Creation
        await createUserWithEmailAndPassword(auth, email, password);

        // Firestore UserData Creation
        const user = auth.currentUser;
        if (user){
            const userDocRef = doc(firestore, 'users', user.uid);

            await setDoc(userDocRef, {
                email: user.email,
                hashedPass: "",
                salt: "",
                name:  name,
                phone: phoneNumber,
                role: "Supplier"

            });
        }
        console.debug('Jalo');
      } catch (error) {
        console.log('Error code: ', error.message);
      }
    }
  };

  return (
    <View style={styles.screen}>
        <View style={{alignItems: 'center', display: 'flex', marginHorizontal: 32,}}>
            <Image
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=cb9d7322-205e-448f-9288-24e81fe46bf5'}}
            style={styles.logo}
            />
            <TextInput placeholder='Nombre Completo *' style={styles.input} autoCapitalize= {'words'}>
            </TextInput>
            <TextInput placeholder='Email *' value={email} onChangeText={setEmail} style={styles.input} autoCapitalize={'none'}>
            </TextInput>
            <TextInput placeholder='Número de teléfono *' style={styles.input}>
            </TextInput>
            <TextInput placeholder='Contraseña *' value={password} onChangeText={setPassword} style={styles.input}>
            </TextInput>
            <TextInput placeholder='Confirmar contraseña *' value={passwordC} onChangeText={setPasswordC} style={styles.input}>
            </TextInput>
            <TouchableOpacity style={[styles.button, {marginRight: 16}]} onPress={handleSignUp}>
                <Text>Registrarse</Text>
            </TouchableOpacity>
            <View style={[styles.flexRow]} >
                <Text style={[styles.flex]}>Ya tienes una cuenta? </Text>
                <TouchableOpacity style={[styles.flex]} onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.linkedText]}>Ingresar</Text>
                </TouchableOpacity>
            </View>
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
      }
});



export default Registration;