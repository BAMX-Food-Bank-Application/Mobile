// Base
import React, {useEffect, useState} from 'react';

// Components
import { checkPermissions, openImagePicker } from '../utils/editProfileIcon';
import DefaultAlert from '../../Global/components/DefaultAlert';

// UI
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';

// Firebase
import storage from '@react-native-firebase/storage';

// Others
import { useNavigation } from '@react-navigation/native';

const UserIcon = ({mini, ID, editable, profile}) => {

    const navigation = useNavigation();

    const [image, setImage] = useState('https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg');

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const triggerAlert = (title, message) => {
        setAlertVisible(!alertVisible);
        setAlertTitle(title);
        setAlertContent(message);
    }

    const getProfileImage = async (_ID) => {
        try{
            const ref = storage().ref('/ProfilePictures/' + _ID + '.jpg');
            const url = await ref.getDownloadURL();
            setImage(url);
        }catch(error){
            return;
        }
    };

    const handleImageChange = () => {
        openImagePicker().then(() => {
            triggerAlert("¡Listo!", "Tu foto de perfil ha sido actualizada");
        })
    }

    useEffect(() => {
        ID ? getProfileImage(ID) : null;
    }, []);

    return(
        <TouchableOpacity onPress={() => editable ? checkPermissions().catch(() => triggerAlert("Algo salió mal", "Intente de nuevo más tarde")) ? handleImageChange() : null : null} activeOpacity={1}>
            <View style={mini ? [styles.imageContainer, {width: 65, height: 65, elevation: 5}]: styles.imageContainer}> 
                <Image style={mini ? [styles.image, {width: 60, height: 60}] : styles.image} source={{uri: profile ? profile : image}}/>
            </View>
            <DefaultAlert
            alertTitle={alertTitle}
            alertContent={alertContent}
            btnContent={"Aceptar"}
            modalVisible={alertVisible}
            onHide={() => {alertTitle === '¡Listo!' ? navigation.navigate('HomeScreen') : setAlertVisible(false); setAlertVisible(!alertVisible)}}
            />
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