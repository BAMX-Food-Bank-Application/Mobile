// Base
import React from 'react';

// UI
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Styles
import DefaultStyles from '../styles/Defaults';

const Button = ({content, functionality, bgColor, fontColor}) => {
    return(
        <TouchableOpacity onPress={() => functionality()} style={[styles.button, {backgroundColor: bgColor}]}>
            <View >  
              <Text style={[DefaultStyles.poppinsRegular, {color: fontColor}]}>{content}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
      flex: 1,
      maxHeight: 50,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
    }
  });

export default Button;