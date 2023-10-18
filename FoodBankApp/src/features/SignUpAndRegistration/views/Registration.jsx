// Base
import React, {useState} from 'react';

// UI
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Components
import DefaultAlert from '../../Global/components/DefaultAlert';
import Button from '../../Global/components/Button';
import Logo from '../../Global/components/Logo';

// Utils
import {validateEmail, validatePassword} from '../../Global/utils/regexValidation';

// Firebase
import {createUserWithEmailAndPassword} from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../../../config/FirebaseConnection';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Others
import {useNavigation} from '@react-navigation/native';
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

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const alertTrigger = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(!showAlert);
  };

  const validateInputs = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    // Check if everything is filled
    if (name === '' || email === '' || password === '' || passwordC === '') {
      alertTrigger('Campos vacíos', 'Por favor llena todos los campos');
      return false;
    }
    // Check if name is valid
    if (!nameRegex.test(name)) {
      alertTrigger('Nombre inválido', 'El nombre ingresado no es valido');
      return false;
    }
    // Check if email is valid
    if (!emailRegex.test(email)) {
      alertTrigger('Correo inválido', 'El correo ingresado no es válido');
      return false;
    }
    // Check if phone number is valid

    if (!phoneRegex.test(phoneNumber)) {
      alertTrigger(
        'Número de teléfono inválido',
        'El número de teléfono ignresado no es válido',
      );
      return false;
    }

    // Check if password is valid
    if (!passwordRegex.test(password)) {
      alertTrigger(
        'Contraseña inválida',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
      );
      return false;
    }
    if (password !== passwordC) {
      alertTrigger('Contraseña inválida', 'Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {

      // We start validation

      if (validateInputs()) {
        // If everything is valid, we proceed to create the user
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            // Creating user data in firestore
            firestore()
              .collection('userData')
              .doc(userCredential.user.uid)
              .set({
                name: name,
                nameCorp: nameCorp,
                address: address,
                phoneNumber: Number(phoneNumber),
                status: Boolean(false),
              })

              .then(() => {
                // Sending email verification to the user
                console.log('User data added');
              })
              .catch(error => {
                console.log('Error adding user data to firestore: ', error);
              });
          })
          .catch(error => {
            console.log('Error creating user: ', error);
          });
      }
  };
  return (
    <SafeAreaView style={DefaultStyles.screen}>
      <View
        style={{alignItems: 'center', display: 'flex', marginHorizontal: 32}}>
        <Logo />
        <TextInput
          placeholder="Nombre Completo *"
          placeholderTextColor={Colors.textDisabled}
          style={[styles.input, DefaultStyles.poppinsRegular]}
          onChangeText={setName}
          autoCapitalize={'words'}></TextInput>
        <TextInput
          placeholder="Correo *"
          placeholderTextColor={Colors.textDisabled}
          value={email}
          onChangeText={setEmail}
          style={[styles.input, DefaultStyles.poppinsRegular]}
          autoCapitalize={'none'}
          keyboardType={'email-address'}></TextInput>
        <TextInput
          placeholder="Nombre de Empresa *"
          placeholderTextColor={Colors.textDisabled}
          style={[styles.input, DefaultStyles.poppinsRegular]}
          onChangeText={setNameCorp}
          autoCapitalize={'none'}></TextInput>
        <TextInput
          placeholder="Ubicación de la Empresa *"
          placeholderTextColor={Colors.textDisabled}
          style={[styles.input, DefaultStyles.poppinsRegular]}
          onChangeText={setAddress}
          autoCapitalize={'none'}></TextInput>
        <TextInput
          placeholder="Número de teléfono *"
          placeholderTextColor={Colors.textDisabled}
          style={[styles.input, DefaultStyles.poppinsRegular]}
          maxLength={10}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType={'phone-pad'}></TextInput>
        <TextInput
          placeholder="Contraseña *"
          placeholderTextColor={Colors.textDisabled}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={[styles.input, DefaultStyles.poppinsRegular]}></TextInput>
        <TextInput
          placeholder="Confirmar contraseña *"
          placeholderTextColor={Colors.textDisabled}
          value={passwordC}
          secureTextEntry
          onChangeText={setPasswordC}
          style={[styles.input, DefaultStyles.poppinsRegular]}></TextInput>

        <View style={{marginTop: 16}}>
          <Button
            content="Registrarse"
            bgColor={Colors.textSecondary}
            fontColor={Colors.textPrimary}
            functionality={() => handleSignUp()}
          />
        </View>

        <View style={[DefaultStyles.flexRow]}>
          <Text
            style={[
              DefaultStyles.poppinsRegular,
              {color: Colors.textPrimary},
            ]}>
            {' '}
            Ya tienes una cuenta?{' '}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[DefaultStyles.linkedText]}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DefaultAlert
        alertTitle={alertTitle}
        alertContent={alertMessage}
        btnContent={'Aceptar'}
        modalVisible={showAlert}
        onHide={() => setShowAlert(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  logo: {
    width: 280,
    height: 280,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Poppins-Regular',
  },
  rowItem: {
    flex: 1,
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
