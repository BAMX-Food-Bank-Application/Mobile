// Base
import React from 'react';

// UI
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';

const UserIcon = ({ID, mini}) => {
    return(
        <TouchableOpacity onPress={() => console.log("MEOOOW!") } activeOpacity={1}>
            <View style={mini ? [styles.imageContainer, {width: 65, height: 65, elevation: 5}]: styles.imageContainer}> 
                <Image style={mini ? [styles.image, {width: 60, height: 60}] : styles.image} source={{uri:"https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"}}/>
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