// Core
import {React, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// UI
import {Text, SafeAreaView, View, StyleSheet, ScrollView, Dimensions} from 'react-native';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Components
import ReturnButton from '../../Global/components/ReturnButton';
import UserIcon from '../components/UserIcon';
import LeaderBoardTable from '../components/LeaderBoardTable';

// Firebase
import app from '../../../config/FirebaseConnection';
import firestore from '@react-native-firebase/firestore';
import {getAuth} from 'firebase/auth';
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth - 32;

const ProfileDetails = () => {

    const auth = getAuth(app);

    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [summaryData, setSummaryData] = useState([0,0,0,0,0,0,0,0,0,0]);

    const tipoDonacion = ['Fruta', 'Verdura', 'Carne','Granos', 'Lácteos', 'Ropa', 'Enlatados', 'Medicamentos', 'Higiene Personal','Otros'];
    const donationType = ['Fruit', 'Vegetable', 'Meat', 'Grains', 'Dairy', 'Clothing', 'Canned', 'Medicine', 'Higiene', 'Others'];

    const getUserData = async () => {
        const UID = auth.currentUser.uid;
        
        const snapshot = await firestore().collection('userData').doc(UID).get();
        const supplierName = snapshot.data().name;
        const supplierEmail = auth.currentUser.email;

        const summaryDataSnapshot = await firestore().collection('Leaderboard').doc(UID).get();
        const _summaryData = summaryDataSnapshot.data();

        setName(supplierName);
        setEmail(supplierEmail);
        setSummaryData(_summaryData);

    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const page = Math.round(contentOffset.x / cardWidth);
        setCurrentPage(page);
        // console.log("Card number ["+page+"]");
    };

    
    return (
        <SafeAreaView style={{display: 'flex', flexDirection: 'column'}}>
            <View style={[DefaultStyles.screen, {backgroundColor: Colors.white, height: '100%'}]}>
                <View style={{paddingVertical: 16}}>
                    <ReturnButton/>
                </View>
                <View style={styles.heroeContainer}>
                    <View style={{position: 'absolute', top:-75, alignItems: 'center'}}>
                        <UserIcon/>
                    </View >
                    <View style={[DefaultStyles.flexItem, {alignItems: 'center', flexGrow: 0.18}]}>
                        <Text style={[DefaultStyles.poppinsTitle, {color: Colors.textSecondary}]}>{name}</Text>
                        <Text style={[DefaultStyles.poppinsSubtitle, {color: Colors.textSecondary}]}>{email}</Text>
                    </View>
                    <View>
                        <ScrollView horizontal={true}
                            pagingEnabled={true} 
                            snapToInterval={cardWidth + 16} 
                            onScroll={handleScroll} 
                            alwaysBounceHorizontal={false} 
                            disableIntervalMomentum={true} 
                            showsHorizontalScrollIndicator={false} 
                            decelerationRate={0.7}
                            style = {{maxHeight:cardWidth/2}}>
                            {
                                tipoDonacion.map((donacion, index) => {
                                    return(
                                        <View key={index} style={styles.card}>
                                            <Text style={DefaultStyles.poppinsTitle}>
                                                {donacion}
                                            </Text>
                                            <Text style={DefaultStyles.poppinsSubtitle}>
                                                {
                                                    summaryData[donationType[index]] ? summaryData[donationType[index]] : 0
                                                } 
                                                {
                                                    index < 6 ? ' Toneladas' : ' Unidades'
                                                }
                                            </Text>
                                            <Text style={DefaultStyles.poppinsSubtitle}>
                                                Puesto
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                        <View style={styles.carrouselIndex}>
                            {
                                tipoDonacion.map((donacion, index) => {
                                    return(
                                        <View key={index} style={[styles.carrouselIndicator, {backgroundColor: currentPage === index ? Colors.white : 'transparent'}]}/>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={DefaultStyles.flexItem}>
                        <LeaderBoardTable Category = {currentPage}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    heroeContainer: {
        borderRadius: 16,
        backgroundColor: Colors.secondary,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: cardWidth/4,
        marginTop: 42,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: cardWidth,
        backgroundColor: Colors.white,
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 12,
        padding: 16,
        elevation: 3,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        },
        mainContent: {
        width: '80%',
        aspectRatio: 1,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        },
        image: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        position: 'absolute',
        top: -50, // Adjust this value as needed to overlap the upper border
        borderRadius: 16,
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
            borderColor: Colors.white,
        }
});

export default ProfileDetails;
