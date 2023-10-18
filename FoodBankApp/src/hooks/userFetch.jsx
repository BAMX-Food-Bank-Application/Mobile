import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../config/FirebaseConnection';
import storage from '@react-native-firebase/storage';


export default function userFetch() {
  const [userDoc, setUserDoc] = useState({});
  const [userImage, setUserImage] = useState('https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg');

    const getProfileImage = async () => {
        try{
            const ref = storage().ref('/ProfilePictures/' + auth.currentUser.uid + '.jpg');
            const url = await ref.getDownloadURL();
            setUserImage(url);
        }catch(error){
            return;
        }
    };

    const getUserDoc = async () => {
      try {
        const doc = await firestore().collection('userData').doc(auth.currentUser.uid).get();
        setUserDoc(doc.data());
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    getProfileImage();
    getUserDoc();   
  }, [auth]);

  return { userDoc, userImage };
};
