import {StyleSheet} from 'react-native';
import Colors from './Colors';


const DefaultStyles = StyleSheet.create({
    poppinsTitle: {
        color: Colors.black,
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 30,
        lineHeight: 34
    },
    poppinsSubtitle: {
        color: Colors.black,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        lineHeight: 32,
      },
    poppinsRegular: {
      color: Colors.black,
      fontFamily: 'Poppins-Regular',
    },
    poppinsMedium: {
      color: Colors.black,
      fontFamily: 'Poppins-Medium', 
    },
    flexItem: {
        flex: 1
    },
  });

  export default DefaultStyles;
