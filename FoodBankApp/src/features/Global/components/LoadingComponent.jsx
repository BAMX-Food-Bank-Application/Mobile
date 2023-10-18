// Base
import React, {useState} from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import Colors from '../../Global/styles/Colors';

import Rive from 'rive-react-native';

const LoadingComponent = ({ loading }) => {
    const [isPlaying, setIsPlaying] = useState(true);

    setTimeout(() => {  
        setIsPlaying(false);
    }
    , 4000);

    return(
        <Modal visible={isPlaying && !loading} animationType='fade'>
            <View style={styles.container}>
                <Rive
                style={styles.animation}
                    url="https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FAnimations%2FloadingAnim.riv?alt=media&token=13a41eff-d91c-4e21-a101-96cdb0a4a0fa&_gl=1*1qwes3r*_ga*OTgxMDEyMDA3LjE2OTIyMTE1NTA.*_ga_CW55HF8NVT*MTY5NzQ5OTQwNC4zMS4xLjE2OTc1MDEyMzguMzYuMC4w"
                />
                <View style={styles.bandage}></View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.defaultBG,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    animation: {
      width: '100%',
      height: 300,
    },
    bandage: {
        backgroundColor:Colors.defaultBG, 
        width: '100%', 
        height: '35%', 
        position: 'absolute',
        bottom: 0,
    }
  })

export default LoadingComponent;