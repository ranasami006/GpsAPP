import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    Button, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
    ImageBackground, TextInput,
    ActivityIndicator, ScrollView,
    Switch,
} from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {updatePassword} from '../Screens/Firebase/auth'
import {getData,upDateData,saveData} from '../Screens/Firebase/utility'
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class timeInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshInterval:{},
            gpsInterval:{},
            time:[],
            pageView:true,
            lan:''
        }
    }   
   
    async componentDidMount() {
        let time = await getData('interval', '123456789');
        let userId= await AsyncStorage.getItem("Token");

        let Languge= await AsyncStorage.getItem("Languge");
        if(Languge==='German')
        {   
            this.setState({lan:true})
        }
        else{
            this.setState({lan:false})
        }
        let userinfo = await getData('users', userId);
        await this.setState({
              time:time,
              refreshInterval:time.refreshInterval,
              gpsInterval:time.gpsInterval,
              isActive:userinfo.isActive,
              pageView:false,
              mapInterval:time.mapInterval
          })  
   
        }  
    render() {

        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light', backgroundColor: 'black' }}
                    barStyle="light-content" // or directly
                    leftComponent={

                        <TouchableOpacity
                            // style={{alignSelf:'flex-start',alignContent:'flex-start',justifyContent:'flex-start'}}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                            <Ionicons
                                name="chevron-back"
                                color={'#000'}
                                size={responsiveWidth(9)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    }
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                <ScrollView style={styles.bottomView}>
                {
                this.state.pageView ?
                    <ActivityIndicator size={'large'} color={'black'} style={{marginTop:responsiveHeight(10) }}/>
            : 
            <>
                    <Text style={{ textAlign: 'center', 
                    fontSize: responsiveFontSize(4), 
                    fontWeight: '600' }}>{this.state.lan? "Zeitintervall" :"Time Interval"}</Text>
                  
                    <View style={styles.bottomform}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",alignSelf:'center',marginTop:responsiveHeight(5)}}>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.lan? "Status" :"Status"}</Text>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>
                                    
                                    {
                                     this.state.lan?
                                     this.state.isActive? "Aktiv": "nicht Aktiv"
                         
                                     :   
                                    this.state.isActive? "Active": "Non Active"
                                    }</Text>
                    </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",alignSelf:'center',marginTop:responsiveHeight(5)}}>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.lan? "Intervall der Website":"Refresh interval"}</Text>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.refreshInterval.value + " " +this.state.refreshInterval.type}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",alignSelf:'center',marginTop:responsiveHeight(5)}}>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.lan? "Intervall der App"    :"interval for sending GPS data"}</Text>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.gpsInterval.value+ " " +this.state.gpsInterval.type} </Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",alignSelf:'center',marginTop:responsiveHeight(5)}}>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.lan? "Startzeit":"Map interval start"}</Text>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.mapInterval.start+ " " +"Uhr"} </Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",alignSelf:'center',marginTop:responsiveHeight(5)}}>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.lan? "Endzeit":"Map interval end"}</Text>
                                <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold'}}>{this.state.mapInterval.end+ " " +"Uhr"} </Text>
                            </View>
                    </View> 
    </>
    }                     
                </ScrollView>



            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: Constants.statusBarHeight,

    },
    image: {
        width: windowWidth,
        height: windowHeight,
    },
    bottomView: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',

    },
    text: {
        color: 'white',
        fontSize: responsiveFontSize(6),
        fontWeight: 'bold',
        padding: responsiveHeight(3),
        marginTop: responsiveHeight(5),

    },
    bottomform: {
       
        padding: responsiveHeight(3),
    },
    headertext1: {
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    textinput: {
        height: responsiveHeight(8),
        elevation: 5,
        backgroundColor: 'white',
        width: windowWidth - 40,
        borderRadius: responsiveHeight(2),
        borderWidth: 0,
        paddingLeft: responsiveHeight(2)
    },
    passwordView: {
        // flexDirection: 'row',
        marginTop: responsiveHeight(6),
        //padding:responsiveHeight(2)

    },
    button1: {
        height: 60,
        width: 201,
        borderRadius: responsiveWidth(2),
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#464646',
        marginBottom: responsiveWidth(15),
    },
    buttonText: {
        fontSize: responsiveFontSize(3),
        color: 'white',
        fontWeight: 'bold',
    },



    header: {
        flexDirection: 'row',
        // marginTop: Constants.statusBarHeight,
        // width: windowWidth,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        // alignContent:'space-between',
        // justifyContent:'space-between',
    },
    profileHeader: {
        // backgroundColor: 'red'
        alignSelf: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: responsiveFontSize(4),
        fontWeight: 'bold',
        color: 'black',
        marginTop: responsiveWidth(5),
        textAlign: 'center',
    },
    profilePic: {
        backgroundColor: '#e3e3e3',
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },
    icon: {
        // marginTop: responsiveWidth(-2),
    },


});
