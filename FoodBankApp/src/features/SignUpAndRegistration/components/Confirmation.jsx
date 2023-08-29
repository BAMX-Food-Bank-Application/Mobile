import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import app from '../../../config/FirebaseConnection';

const Confirmation = ( {route} ) => {
  const {email, name, password, phoneNumber} = route.params
  const auth = getAuth(app);
  const navigation = useNavigation();
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.arrowbtn}>
        <Image
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
              style={styles.arrow}
              />
      </TouchableOpacity>
      <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Flock.png?alt=media&token=217ac8fd-7d81-4625-9059-ee323a20c838',
          }}
          style={styles.logo}
      />
      <Text style={styles.poppinssemibold}>Verificación OTP</Text>
      <Text style={styles.codeText}>
        Ingresa el código que se ha enviado a {''}
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(otp)}>
        <Text style={styles.poppinsmedium}>Verificar</Text>
      </TouchableOpacity>
      <View style={[styles.flexRow]}>
          <Text style={[styles.flex]}>¿No recibiste un mensaje? </Text>
          <TouchableOpacity
            style={[styles.flex]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.linkedText]}>Reenviar</Text>
          </TouchableOpacity>
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
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center',
    marginTop: 32
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowbtn: {
    width: 24,
    height: 24,
    marginHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: 'center',
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  codeText:{
    fontFamily: 'Poppins-Medium', 
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 24,
  },
  phoneNumberText: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 1,
  },
  otpText: {
    fontSize: 32,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 64,
    fontFamily: 'Poppins-Medium', 
  },
  poppinsmedium: {
    fontFamily: 'Poppins-Medium', 
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  poppinssemibold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32
  },
  rowItem: {
    flex: 1,
  },
  linkedText: {
    color: '#E8042C',
    fontFamily: 'Poppins-Medium', 
  },
});

export default Confirmation;