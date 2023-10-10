// Base
import React, {useState} from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import Rive, {Fit} from 'rive-react-native';

const LoadingComponent = ({ loading }) => {
    const riveRef = React.useRef();
    const [isPlaying, setIsPlaying] = useState(true);

    return(
        <Modal visible={isPlaying && !loading} animationType='fade'>
            <View style={styles.container}>
                <Rive
                style={styles.animation}
                    url="https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FAnimations%2FloadingAnimation.riv?alt=media&token=4ddb64c4-b7ba-454e-9a42-8e9095db2072&_gl=1*10vd1zd*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NjgzNjM1MS4xMjUuMS4xNjk2ODM5MjcyLjU1LjAuMA.."
                    ref={riveRef}
                    onStop={() => setIsPlaying(false)}
                />
                <View style={{backgroundColor:'white', width: 180, height:50, top:-60, left:75}}></View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 400,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    animation: {
      width: '100%',
      height: 300,
    },
  })

export default LoadingComponent;