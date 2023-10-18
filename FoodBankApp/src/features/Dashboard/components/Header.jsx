import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {auth} from '../../../config/FirebaseConnection';
import storage from '@react-native-firebase/storage';
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

const Header = ({setIsDrawerOpen}) => {
  const [image, setImage] = useState(
    'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
  );

  const userUID = auth.currentUser.uid;

  const getProfileImage = async () => {
    try {
      const ref = storage().ref('/ProfilePictures/' + userUID + '.jpg');
      const url = await ref.getDownloadURL();
      setImage(url);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getProfileImage();
  }, [image]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainerLeft}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=bb2f494f-d3dc-41bc-87f7-b677e0e966d7&_gl=1*1pfwxwu*_ga*OTgxMDEyMDA3LjE2OTIyMTE1NTA.*_ga_CW55HF8NVT*MTY5NzQ3OTc2NC4yNy4xLjE2OTc0Nzk3ODQuNDAuMC4w',
          }}
          style={styles.image}
        />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingRight: 24,
          borderRadius: 24,
          paddingVertical: 8,
          paddingLeft: 16,
        }}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Flocation.png?alt=media&token=b8004586-8a93-4043-b9b9-1009b4332acf&_gl=1*fi4jw1*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzQ3NzIyMi4xNTQuMS4xNjk3NDgwNzYyLjIyLjAuMA..',
          }}
          width={16}
          height={16}
          style={{marginRight: 8}}
        />
        <Text style={[DefaultStyles.poppinsMedium, {color: Colors.textPrimary}]}>BAMX Guadalajara</Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsDrawerOpen(true)}
        style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    top: -32,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 64,
    height: 64,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 4,
    elevation: 10,
  },
  image: {
    width: 64,
    height: 64,
    margin: 8,
    borderRadius: 100,
  },
  imageContainerLeft: {
    borderRadius: 20,
    width: 64,
    height: 64,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
