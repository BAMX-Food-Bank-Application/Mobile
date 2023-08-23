import React from 'react';
import {Text, View, Image, Pressable, TextInput, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F3B246',
      }}>
        <View style={{alignItems: 'center'}} >
          <Image source={require('./images/bamx_logo.png')} style={{width: 200, height: 200,}}/>
          <TextInput value='Email' style={styles.input} ></TextInput>
          <TextInput value='Contraseña' style={styles.input}></TextInput>
        </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}
      >
        <Pressable style={styles.button}>
          <Text>Registrarse</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Ingresar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#EFEFEF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  }
});

export default App;
