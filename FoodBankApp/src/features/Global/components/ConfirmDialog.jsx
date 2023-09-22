// Base
import {React, useState} from 'react';

// UI
import { StyleSheet, Text, View, Modal} from 'react-native';

// Styles
import DefaultStyles from '../styles/Defaults';
import Colors from '../styles/Colors';

// Components
import Button from './Button';


const ConfirmDialog = ({alertTitle, alertContent, btnContent, modalVisible, onAccept, onDeny}) => {


    if (!modalVisible) return null;

  return (
    <Modal animationType='fade' transparent={true} visible={true}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          
          {alertTitle != null &&(<Text style={[DefaultStyles.poppinsTitle, {flex: 1}]}>{alertTitle}</Text>)}
            <Text style={[DefaultStyles.poppinsRegular, {flex: 1}]}>{alertContent}</Text>
            <View style={{flexDirection: 'row', columnGap: 16}}>
                <Button
                    bgColor={Colors.approval}
                    content={btnContent[0]}
                    fontColor={Colors.white}
                    functionality={() => onAccept()}
                />
                <Button
                    bgColor={Colors.primary}
                    content={btnContent[1]}
                    fontColor={Colors.white}
                    functionality={() => onDeny()}
                />
                </View>
          
        </View>
      </View>   
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 24,
    
  },
  modalContent: {
      display: 'flex',
      borderRadius: 25,
      alignItems: 'center',
      backgroundColor: Colors.white,
      elevation: 10,
      padding: 24,
      rowGap: 16,        
  },
});

export default ConfirmDialog;