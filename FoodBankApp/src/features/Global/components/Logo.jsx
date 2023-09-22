// Base
import React from 'react';

// UI
import { StyleSheet, View, Image} from 'react-native';

const Logo = ({imageLink}) => {
    return(
        <View > 
          { 
            imageLink == null &&(
              <Image
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=bb2f494f-d3dc-41bc-87f7-b677e0e966d7'}}
                style={styles.logo}
              />
            )
          }

          {
            imageLink != null &&(
              <Image
                source={{uri: imageLink}}
                style={styles.logo}
              />
            )
          }
        </View>
    )
}


const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 300,
        marginBottom: 16,
      },
  });

export default Logo;