import React from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ReturnButton = () => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowbtn}>
            <Image
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
              style={styles.arrow}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    arrow: {
        width: 24,
        height: 24,

      },
      arrowbtn: {
        width: 24,
        height: 24,
      },
  });

export default ReturnButton;