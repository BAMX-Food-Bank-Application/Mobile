// Base
import React, {useEffect, useState} from 'react';
import { checkPermissions, openImagePicker } from '../utils/editProfileIcon';
import storage from '@react-native-firebase/storage';

// UI
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';



const UserIcon = ({mini, ID, editable}) => {

    // "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
    const [image, setImage] = useState('https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg');

    const getProfileImage = async (_ID) => {
        try{
            const ref = storage().ref('/ProfilePictures/' + _ID + '.jpg');
            const url = await ref.getDownloadURL();
            setImage(url);
        }catch(error){
            return;
        }
    
    };

    useEffect(() => {
        getProfileImage(ID);
    }, []);

    return(
        <TouchableOpacity onPress={() => editable ? checkPermissions() ? openImagePicker() : null : null} activeOpacity={1}>
            <View style={mini ? [styles.imageContainer, {width: 65, height: 65, elevation: 5}]: styles.imageContainer}> 
                <Image style={mini ? [styles.image, {width: 60, height: 60}] : styles.image} source={{uri:image}}/>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 160,
        height: 160,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 4,
        elevation: 10,
        
    },  
    image: {
        width: 150,
        height: 150,
        margin: 16,
        borderRadius: 100,
      },
  });

export default UserIcon;