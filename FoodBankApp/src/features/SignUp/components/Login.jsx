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


const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  return (
    <LinearGradient
      colors={['#f3b246', '#e01e40']}
      style={styles.linearGradient}>
      <View style={styles.screen}>
        <View style={{alignItems: 'center', display: 'flex'}}>
          <Image
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=cb9d7322-205e-448f-9288-24e81fe46bf5'}}
            style={styles.logo}
          />
          <TextInput
            inlineImageLeft = {{uri:'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcorreo.png?alt=media&token=59f6425b-3305-4f4d-91a2-847e83610de8'}}
            placeholder="Email"
            style={isFocused ? styles.inputFocused : styles.input}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}></TextInput>
          <TextInput
            placeholder="Contraseña"
            style={isFocused2 ? styles.inputFocused : styles.input}
            onFocus={() => {
              setIsFocused2(true);
            }}
            onBlur={() => {
              setIsFocused2(false);
            }}
            secureTextEntry></TextInput>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, {marginRight: 16}]}>
            <Text>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
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
  },
  button: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttons: {
    alignSelf: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginTop: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
});

export default Login;
