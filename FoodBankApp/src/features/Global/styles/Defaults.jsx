import {StyleSheet} from 'react-native';
import Colors from './Colors';


const DefaultStyles = StyleSheet.create({
    poppinsTitle: {
        color: Colors.textPrimary,
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 24,
        lineHeight: 32
    },
    poppinsSubtitle: {
        color: Colors.textDisabled,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        lineHeight: 32,
      },
    poppinsRegular: {
      color: Colors.textPrimary,
      fontFamily: 'Poppins-Regular',
    },
    poppinsMedium: {
      color: Colors.textPrimary,
      fontFamily: 'Poppins-Medium', 
    },
    flexItem: {
        flex: 1
    },
    linkedText: {
      color: Colors.primary,
      fontFamily: 'Poppins-Medium', 
    },
    flexRow: {
      display: 'flex',
      margin: 10,
      flexDirection: 'row',
      columnGap: 16,
      justifyContent: 'space-around',
      alignContent: 'center',
      alignItems: 'center',
    },
    screen: {
      alignContent: 'center',
      backgroundColor: '#EFEFEF',
      paddingHorizontal: 8,
      paddingTop: 24,
      paddingBottom: 8,
    },
    input: {
      width: '100%',
      flex: 1,
      borderBottomWidth: 1,
      color: Colors.textPrimary,
      padding: 10,
      fontFamily: 'Poppins-Regular',
      marginBottom: 36,  
    },
  });

  export default DefaultStyles;
