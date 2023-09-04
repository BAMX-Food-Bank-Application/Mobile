import React from 'react';
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const NewRequest = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.full}>
            <View>
                <Text style={styles.text}>Nuevo {"\n"}Cargamento</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Request')} style={styles.plusbtn}>
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
        backgroundColor: '#F89C04',
        width: '80%',
        height: '30%',
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    plus: {
        height: '100%',
    },
    plusbtn: {
        width: '20%',
        height: '80%'
    },
    text: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 24,
        color: 'white',
        lineHeight: 25,
    },

})

export default NewRequest;
