import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    Button, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
    ImageBackground, TextInput,
    ActivityIndicator, ScrollView, BackHandler,
    ToastAndroid,
} from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, DrawerActions } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as TaskManager from 'expo-task-manager';
import { getData, upDateData, saveData, UpdateuserDate } from '../Screens/Firebase/utility'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import * as BackgroundFetch from 'expo-background-fetch';
const TASK_NAME = "BACKGROUND_TASK"

TaskManager.defineTask('FetchLocationInBackground', ({ data, error }) => {
    if (error) {
      console.log("Error bg", error)
      return;
    }
    if (data) {
      const { locations } = data;
      try {
        const receivedNewData = 
        test( locations[0].coords.latitude, 
            locations[0].coords.longitude)
   
            // do your background fetch here
       console.log("BGGGG->", locations[0].coords.latitude, 
       locations[0].coords.longitude);
        return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
      } catch (error) {
        return BackgroundFetch.Result.Failed;
      }  
    }
  });
  async function test(latitude, longitude){
    let detail = {
        lat: latitude,
        lng: longitude,   
    };  
    let data = await AsyncStorage.getItem("Token");
    let success = await upDateData('vehicles', data, detail);
    console.log("DONE Firbase")
  }
  const backgroundLocationFetch = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    //const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('cmon dance with me!')
      
      await Location.startLocationUpdatesAsync('FetchLocationInBackground', {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 0,
        foregroundService: {
          notificationTitle: 'GPS Tracker',
          notificationBody: 'Live Tracker is on,to stop please logout'
        }
      });
    }
  }
export default class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            image1: '',
            Userdata: [],
            pageView:true,
        }
    }

    async componentDidMount() {
        this.startFunction();
    }
    componentWillUnmount = async () => {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick,
        );
    };
    handleBackButtonClick() {
        ToastAndroid.show('Please click on logout button!', ToastAndroid.SHORT);
        return true;
    }
    startFunction = async () => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick,
        );
        backgroundLocationFetch();
        
        let Languge= await AsyncStorage.getItem("Languge");
        if(Languge==='German')
        {   
            this.setState({lan:true})
        }
        else{
            this.setState({lan:false})
        }
        let userId = await AsyncStorage.getItem("Token");

        let userinfo = await getData('users', userId);
       
       
        
        let username = userinfo.email.split('@')
        await this.setState({
            Userdata: userinfo,
            email: username[0],
            pageView:false,
        })
        let time = await getData('interval', '123456789');

        var hours = new Date().getHours();


        if (userinfo.image) {
            this.setState({
                image1: userinfo.image
            })
        }

        this.timerHandle = setInterval(async () => {
            if (hours >= time.mapInterval.start && hours <= time.mapInterval.end) {
                await this.getUserCurrentPosition();
                console.log("INNN")
            }
            else {
                console.log("OUT")
            }
        }, 20000);
    }


    getUserCurrentPosition = async () => {

        let { status } = await Location.requestPermissionsAsync();
        // const { status1, expires, permissions } = await Permissions.getAsync(
        //     Permissions.CALENDAR,
        //     Permissions.CONTACTS
        //   );
        //   if (status !== 'granted') {
        //     alert('Hey! You have not enabled selected permissions');
        //   } 
        //   else{
        //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        //         accuracy: Location.Accuracy.Balanced,
        //       });
        //   }
      
       if (status !== 'granted') {
            this.setState({ errorMsg: 'Permission to access location was denied' });
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
       
        this.setState({ location: location });
        let text = 'Waiting..';
        if (this.state.errorMsg) {
            text = this.state.errorMsg;
        } else if (location) {
            text = JSON.stringify(location);
        }
        console.log(text)

        this.setCuerrentLocationInDb(location.coords.latitude, location.coords.longitude)

    }

    async setCuerrentLocationInDb(latitude, longitude) {
        let data = await AsyncStorage.getItem("Token");
        let detail = {
            lat: latitude,
            lng: longitude,
            adminId: this.state.Userdata.adminId,
            vehicleName: this.state.Userdata.name,
        };
        if(this.state.Userdata.adminId){
        let success = await saveData('vehicles', data, detail);
        console.log("DONE typing")
        }
    }



    imagePicker1 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        //console.log(result);

        if (!result.cancelled) {
            this.setState({ image1: result.uri });
        }
    }
    render() {

        return (
            <>
             {
              this.state.pageView ?
                    <ActivityIndicator size={'large'} color={'black'} style={{marginTop:responsiveHeight(10) }}/>
            : 
            <View style={styles.container}>
             
                <Header
                    statusBarProps={{ barStyle: 'light', backgroundColor: 'black' }}
                    barStyle="light-content" // or directly

                    centerComponent={{
                        text: this.state.lan?"Profil":'Profile',
                        style: {
                            fontSize: responsiveFontSize(3.5),
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                        }
                    }}
                    rightComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.openDrawer();
                            }}>
                            <Entypo
                                name={'menu'}
                                color={'#000'}
                                size={responsiveWidth(7)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    }
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                    }}
                />

                <ScrollView style={styles.bottomView}>

                    {/* <View style={styles.profilePic}

                    >
                        {!this.state.image1 ? (
                            <Text style={{
                                color: '#464646', textAlign: 'center',
                                fontSize: responsiveFontSize(2.5),
                                fontWeight: '700',
                            }}>
                               {this.state.lan?"Kein Bild":"No image"}
                            </Text>
                        ) : (
                            <Image source={{ uri: this.state.image1 }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 150 / 2
                                }}
                            >
                            </Image>
                        )}

                    </View> */}

                    <View style={styles.bottomform}>
                        <Text style={styles.headertext1}> {this.state.lan?"Fahrzeug":"Name"}</Text>

                        <TextInput
                            style={styles.textinput}
                            placeholder={'hello'}
                            editable={false}
                            placeholderTextColor={'grey'}
                            onSubmitEditing={() => this._password.focus()}
                            returnKeyType="next"
                            returnKeyLabel="next"
                            value={this.state.Userdata.name}
                            onChangeText={(text) => {
                                this.setState({ email: text });
                            }}
                        />
                        <Text style={styles.headertext1}> {this.state.lan?"Benutzername":"User Name"}</Text>

                        <TextInput
                            style={styles.textinput}
                            placeholder={'user name'}
                            editable={false}
                            placeholderTextColor={'grey'}
                            onSubmitEditing={() => this._password.focus()}
                            returnKeyType="next"
                            returnKeyLabel="next"
                            value={this.state.email}
                            onChangeText={(text) => {
                                this.setState({ email: text });
                            }}
                        />
                  

                        <Text style={{
                            textAlign: 'center',
                            color: '#220764',
                            fontSize: responsiveFontSize(2)
                        }}>{this.state.ErrorMessege}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                            this.props.navigation.navigate('editProfile', {
                                Item: this.state.Userdata,

                            });
                        }}>
                        
                                <Text style={[styles.buttonText, { color: '#fff' }]}>{this.state.lan?"Profil bearbeiten":"Edit profile"}</Text>
                        

                    </TouchableOpacity>
                </ScrollView>
                                
       </View>
    }
      </>
   
        );
    }
}
// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     if (error) {
//         console.log("eRrroor")
//     }
//     if (data) {
//       const { locations } = data;
//       // do something with the locations captured in the background
//       console.log("PAKSKKSKSK")
//     }
//   });

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
        marginTop: responsiveHeight(2)
    },
    text: {
        color: 'white',
        fontSize: responsiveFontSize(6),
        fontWeight: 'bold',
        padding: responsiveHeight(3),
        marginTop: responsiveHeight(5),

    },
    bottomform: {
        marginTop: responsiveHeight(5),
        padding: responsiveHeight(3),
    },
    headertext1: {
        fontSize: responsiveFontSize(3),
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
        flexDirection: 'row',
        //alignContent: 'space-between',
        // alignItems: 'center',
        width: windowWidth - 40,

    },
    button1: {
        height: 60,
        width: 220,
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

    icon: {
        marginTop: responsiveWidth(2),
    },

    header: {
        flexDirection: 'row',
        marginTop: Constants.statusBarHeight,
        width: windowWidth,
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
        borderRadius: 150 / 2,
        justifyContent: 'center', alignContent: 'center', alignItems: 'center'
    }

});
