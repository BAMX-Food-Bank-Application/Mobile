// Base
import React, { useEffect, useState } from 'react';

// UI
import { StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Firebase
import firestore from '@react-native-firebase/firestore';
import UserIcon from './UserIcon';



const LeaderBoardTable = ({Category}) => {
    const [leaderBoardData, setLeaderBoardData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const tipoDonacion = ['Fruit', 'Vegetable', 'Meat', 'Grains', 'Dairy', 'Clothing', 'Canned', 'Medicine', 'Higiene', 'Others'];

    const fetchData = async () => {
        const userDataSnapshot = await firestore().collection('userData').get();
        const summaryDataSnapshot = await firestore().collection('Leaderboard').orderBy(tipoDonacion[Category], 'desc').limit(10).get();

        const userData = userDataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const _summaryData = summaryDataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


        setSummaryData(_summaryData);
        setLeaderBoardData(userData);
    }

    useEffect(() => {
        fetchData();
    }
    , []);

    const onRefresh = () => {
        setRefresh(true);
        fetchData().then(() => setRefresh(false));
    }
    

    return(
        <View style={styles.tableContainer}> 
        <View style={styles.row}>
                    <Text style={[DefaultStyles.poppinsTitle, {width: '22%'}, styles.header]}>#</Text>
                    <Text style={[DefaultStyles.poppinsTitle, styles.header]}>Empresa</Text>
                    <Text style={[DefaultStyles.poppinsTitle, {width: '33%'}, styles.header]}>Cantidad</Text>
                </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
            >
                
                <View>
                {
                    summaryData.map((user, index) => {
                        return(
                            <View key={user.id} style={styles.row}>
                                <View style={{display:'flex', flexDirection:'row', alignItems: 'center', columnGap: 12}}>
                                    <Text style={[DefaultStyles.poppinsTitle,{color:'black'}]}>{index+1}</Text>
                                    <UserIcon mini={true} ID={user.id}/>
                                </View>

                                <Text style={[DefaultStyles.poppinsRegular, styles.column, {color:'black'}]}>{leaderBoardData.find(doc => doc.id === user.id) ? leaderBoardData.find(doc => doc.id === user.id).nameCorp : 'placeholder' }</Text>
                                <Text style={[DefaultStyles.poppinsRegular, styles.column, {width: '33%', color:'black'}]}>
                                {
                                    summaryData.find(doc => doc.id === user.id) ? summaryData.find(doc => doc.id === user.id)[tipoDonacion[Category]] : 0
                                }
                                {
                                    Category <= 7 ? ' Toneladas' : ' Unidades'
                                }
                                </Text>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    tableContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'scroll',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 4,
        elevation: 10,       
        marginBottom: 8,
        marginHorizontal: 8,
        padding: 12,
        borderRadius: 8,
        width: '100%',
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 14,
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        columnGap: 16,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    column:{
        overflow: 'scroll',
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
  });

export default LeaderBoardTable;