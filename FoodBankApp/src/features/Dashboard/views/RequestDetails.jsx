// Core
import {React, useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../../config/FirebaseConnection';

// UI
import {ScrollView, Text, StyleSheet, View, Image, Dimensions} from 'react-native';

// Components
import DefaultAlert from '../../Global/components/DefaultAlert';
import Button from '../../Global/components/Button';
import LoadingComponent from '../../Global/components/LoadingComponent';
import UserIcon from '../components/UserIcon';

// Styles 
import Colors from '../../Global/styles/Colors';
import DefaultStyles from '../../Global/styles/Defaults';

// Firebase
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import ReturnButton from '../../Global/components/ReturnButton';

// Utils
import {getDate} from '../../Global/utils/dataUtils';

// Hooks
import userFetch from '../../../hooks/userFetch';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth - 24;

const RequestDetails = ({route}) => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const {userDoc} = userFetch();

  const { docData } = route.params;
  const data = docData[0];

  const [alertVisible, setAlertVisible] = useState(false);  
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [btnContent, setBtnContent] = useState(['','']);
  const [isLoading, setIsLoading] = useState(true);

  const categoryImage = {
    'FR' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FFR.png?alt=media&token=453a699d-11ca-4319-8143-77569313ce58&_gl=1*1id5krl*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI1NzY2LjYwLjAuMA..',
    'CA' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FCA.png?alt=media&token=0ef6352d-1c2a-413d-baef-212956ee3e28&_gl=1*14fghs9*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI1ODM3LjYwLjAuMA..',
    'EN' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FEN.png?alt=media&token=e223e649-e8aa-4215-bbce-082934504fef&_gl=1*isf10x*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MDQzLjYwLjAuMA..',
    'GR' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FGR.png?alt=media&token=520e65ca-f64c-4db1-b528-b144ee1d7402&_gl=1*tce5hq*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MDU5LjQ0LjAuMA..',
    'HR' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FHP.png?alt=media&token=355ccf0a-a1ca-4606-8be2-37e6a733c528&_gl=1*1524ki2*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MDc1LjI4LjAuMA..',
    'LA' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FLA.png?alt=media&token=f5b3ba65-2b5e-4b42-8972-b6975767f351&_gl=1*p49mzd*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MDg0LjE5LjAuMA..',
    'ME' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FME.png?alt=media&token=06a9b098-1ba7-4f54-8801-5e6fad503181&_gl=1*1485roe*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MDk0LjkuMC4w',
    'OT' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FOT.png?alt=media&token=a5bf2509-896c-48b0-9bbf-8ef72bb9a1f5&_gl=1*12yslqg*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MTA0LjYwLjAuMA..',
    'RO' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FRO.png?alt=media&token=498be3ad-5007-48b9-bd0c-f6ccd18cbb66&_gl=1*13x58rh*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MTE0LjUwLjAuMA..',
    'VR' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcategories%2FVE.png?alt=media&token=60eb6360-dfaa-42b9-ba28-9ed4b58e0a04&_gl=1*1lwcmaz*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzEyNTYxOC4xNDguMS4xNjk3MTI2MTMzLjMxLjAuMA..'
  };
  const statusImage ={
    'En camino' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcamion.png?alt=media&token=36e60c65-f444-4e3b-be63-7f8d86f4ebb8&_gl=1*13a7sag*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyMTI0LjMuMC4w',
    'Entregado' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcheck.png?alt=media&token=a33b145d-ee7f-40f6-b7c0-4803a882235b&_gl=1*vqhh4b*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyMzk5LjI1LjAuMA..',
    'Cancelado' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcancelado.png?alt=media&token=83d60d6f-7601-4abd-aa18-08796baf593c&_gl=1*1b17px4*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyMzgzLjQxLjAuMA..',
    'Pendiente' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fpendiente.png?alt=media&token=d6e6c8ec-ff1b-4086-b95f-81bba6ccf5e0&_gl=1*a7776s*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyNDEyLjEyLjAuMA..',
  }

  const colorStatus = {
      'En camino': '#4200ff',
      'Entregado': '#38b503',
      'Cancelado': 'gray',
      'Pendiente': '#f07e15',
  }

  const navigation = useNavigation();

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const page = Math.round(contentOffset.x / cardWidth);
    setCurrentPage(page);
  };

  const triggerAlert = (title, message, button) => {
    setAlertTitle(title);
    setAlertContent(message);
    setBtnContent(button);
    setAlertVisible(!alertVisible);
  };

  const getDocumentsData = () => {
    setIsLoading(true);

         data.productName.forEach((product, index) => {
          
          const newProductData = {
            Name: product.length > 16 ? product.substring(0, 16) + '...' : product,
            Type: data.type[index],
            Quantity: data.weight[index],
            MeasuringUnit: data.unit[index],
            ExpirationDate: data.expirationDates[index]
          };    
          
          setProductList((prevList) => [...prevList, newProductData]);

        });      

    setIsLoading(false);
  };
  const cancelRequest = () => {
    const UID = auth.currentUser.uid;

    try {
      firestore()
        .collection('userData')
        .doc(UID)
        .collection('requestsHistory')
        .doc(docData[0].id)
        .update({
          status: 'Cancelado',
          cancellationDate: getDate(),
        })
        .then(() => {
          triggerAlert('Cargamento cancelado', 'El cargamento ha sido cancelado', 'Ok');
          navigation.navigate('HomeScreen');
        });
    } catch (error) {
      triggerAlert('Error', "Se produjo un error inesperado, intente de nuevo más tarde.", 'Ok')
    }
  };

  useEffect(() => {
    setProductList([]);
    getDocumentsData();
  }, []);

  if (!isLoading) return (
    <SafeAreaView>
      <LoadingComponent loading={isLoading}/>
      <View style={styles.screen}>
          <View style={DefaultStyles.header}>
            <ReturnButton styled={false}/>
            <Text style={[DefaultStyles.poppinsTitle, {flex: 4}]}>Cargamento #{String(data.requestID).padStart(5, '0')}</Text>
          </View>
        <View>

        </View>
        <View style={[styles.mainCardView, {padding:32}]}>
            <UserIcon ID={auth.currentUser.uid} mini={true}/>
            <View style={[DefaultStyles.flexColumn, {alignItems: 'flex-start'}]}>
              <Text style={DefaultStyles.poppinsRegular}>{userDoc.name}</Text>
              <Text style={DefaultStyles.poppinsRegular}>{userDoc.nameCorp}</Text> 
            </View>
        </View>
        <Text style={[DefaultStyles.poppinsTitle, {marginTop: 16, marginBottom: 8}]}>Productos: </Text>

        <View style={styles.productHolder}>
          
              <ScrollView 
              horizontal={true}
              pagingEnabled={true} 
              snapToInterval={cardWidth - 64} 
              onScroll={handleScroll} 
              alwaysBounceHorizontal={false} 
              disableIntervalMomentum={true} 
              showsHorizontalScrollIndicator={false} 
              decelerationRate={0.7}
              style = {{maxHeight:cardWidth/2}}>
                
              {
                productList.map((product, index) => {
                  return(
                    <View key={index} >
                      <View style={{width:cardWidth - 64}}>
                        <View style={[styles.mainCardView]}>
                          <View style={styles.subCardView}>
                            <Image style={{width:36, height:36}} source={{uri: categoryImage[product.Type]}}/>
                          </View>

                          <View>
                  
                              <View>
                                <Text style={[DefaultStyles.poppinsRegular, {fontSize: 18}]}>{product.Name}</Text>
                                <Text style={[DefaultStyles.poppinsRegular, {fontSize: 12}]}>{product.Quantity + ' ' + product.MeasuringUnit}</Text>
                                <Text style={[DefaultStyles.poppinsRegular, {fontSize: 16}]}>Expira: </Text>
                                <Text style={[DefaultStyles.poppinsRegular, {fontSize: 12}]}>{product.ExpirationDate}</Text>
                              </View>
                              
                            
                          </View>
                          
                        </View>
                        
                      </View>
                    </View>
                  
                  )
                  
                })
              }
              </ScrollView>
              <View style={styles.carrouselIndex}>
              {
                productList.map((product, index) => {
                  return (
                    <View 
                      key={index} 
                      style={[styles.carrouselIndicator, {backgroundColor: currentPage === index ? Colors.textSecondary : 'transparent'}]}
                    />
                  )
                })
              }
            </View>
              
            
        
          <View style={{flexDirection: "row", display:'flex', gap: 16}}>
            <View style={styles.halfCardView}>
              <View style={{backgroundColor: colorStatus[data.status], padding:16, borderRadius: 48}}>
                <Image style={{height:24, width:24, backgroundColor: colorStatus[data.status],}} source={{uri: statusImage[data.status]}}/>
              </View>
              <Text style={DefaultStyles.poppinsMedium}>{data.status}</Text>
            </View>

            <View style={styles.halfCardView}>
              <Text style={[DefaultStyles.poppinsMedium, {textAlign: 'center'}]}>
                { data.status === "Cancelado" ? data.cancellationDate : data.creationDate } 
                </Text>
              <Text style={[DefaultStyles.poppinsMedium, {textAlign: 'center'}]}>
                { data.status === "Cancelado" ? "Cancelación" : "Entrega"}</Text>
            </View>

          </View>
        </View>
        
        
        {
          data.status === 'Cancelado' || data.status === 'Entregado' 
          ? null
          : <Button content={'Cancelar cargamento'} bgColor={Colors.primary} fontColor={Colors.textSecondary} functionality={() => cancelRequest()}/>
        }        

      </View>  

      <DefaultAlert 
        modalVisible={alertVisible}
        alertTitle={alertTitle}
        alertContent={alertContent}
        onHide={() => triggerAlert('', '', [''])}
        btnContent = {btnContent}
      />
    </SafeAreaView>

  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    background:
      'linear-gradient(0deg, rgba(243,178,70,.8) 0%, rgba(224,30,64,.8) 100%)',
    padding: 24,
  },
  button: {
    backgroundColor: '#E01E40',
    marginTop: 16,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: 'white', 
    fontWeight: 'bold',
  },

  flexContainer: {
    alignSelf: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  mainCardView: {
    minHeight: 120,
    maxWidth: cardWidth - 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 48,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 8,
  },
  productHolder: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 8,

    backgroundColor: Colors.secondary, 
    justifyContent: 'center', 
    flexDirection: 'column', 
    maxWidth: cardWidth - 8
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfCardView: {
    backgroundColor: Colors.textSecondary, 
    flex: 1, 
    borderRadius: 48, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16, 
    elevation: 8, 
    shadowColor: 'black', 
    shadowOffset: {width: 0, height: 0}, 
    shadowOpacity: 1, 
    shadowRadius: 8, 
    rowGap: 16
  },
  mini: {
    width: 30,
    height: 30,
  },
  carrouselIndex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    height: 16,
    },
carrouselIndicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
}
});
