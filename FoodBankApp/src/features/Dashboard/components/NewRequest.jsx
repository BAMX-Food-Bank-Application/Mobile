import React from 'react';
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DefaultStyles from '../../Global/styles/Defaults';


const NewRequest = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.full}>
            <View>
                <Text style={[DefaultStyles.poppinsTitle, {color: 'white'}]}>Nuevo {"\n"}Cargamento</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateRequest')} style={styles.plusbtn} accessibilityLabel='Add Button'>
                <Image
                    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Fa%C3%B1adir.png?alt=media&token=e70ed552-72c6-45e4-8cc1-9be2baaf9ff3'}}
                    style={styles.plus}
                />
            </TouchableOpacity>
        </View>    
    )
}

const styles = StyleSheet.create({
    full:{
        display: 'flex',
        backgroundColor: '#F89C04',
        minHeight: 100,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    plus: {
        width: 64,
        height: 64,
        alignSelf: 'center',
    },
    

})

export default NewRequest;
