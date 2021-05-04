import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as firebase from 'firebase'
import { FontAwesome, Entypo, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pageview: true,
      lan: '',
    };
  }
  async componentDidMount() {
    
    let Languge = await AsyncStorage.getItem("Languge");
    if(Languge){
     if (Languge === 'German') {
      this.setState({ lan: true })
    }
    else {
      console.log("pak")
      this.setState({ lan: false, pageview: false })
    }
  }
  else{
    await AsyncStorage.setItem("Languge","German");
    this.setState({ lan: true })
  }
  }

  async Logout() {
    Alert.alert(
      "Log out",
      this.state.lan ? "Möchtest du ausloggen?" : "Are you sure you want to log out?",
      [
        {
          text: this.state.lan ? "Abbruch" : "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.logMeOut() }
      ],
      { cancelable: false }
    );


  }
  async logMeOut() {
    await AsyncStorage.removeItem('Token')
    await firebase.auth().signOut();
    Location.hasStartedLocationUpdatesAsync("FetchLocationInBackground").then((value) => {
      if (value) {
        Location.stopLocationUpdatesAsync("FetchLocationInBackground");
      }
    });
    this.props.navigation.navigate('signIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <StatusBar
            barStyle="light"
            translucent
          />
          <View style={styles.profileView}>

            <Image source={require('../assets/BACKGROUNDIMAGE.png')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                alignSelf: 'center',
                marginRight: responsiveHeight(10),
                marginTop: responsiveHeight(2)
              }}
            >
            </Image>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.closeDrawer();
              }}>
              <Ionicons
                name="chevron-forward"
                color={'#000'}
                size={responsiveWidth(9)}
                style={styles.icon}
              />
            </TouchableOpacity>

          </View>
          {this.state.pageView ?
            <ActivityIndicator size={'large'} color={'black'} style={{ marginTop: responsiveHeight(10) }} />
            :
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('settings');
                }}
                style={styles.tab}>
                <View style={styles.iconView}>
                  <AntDesign
                    name={'setting'}
                    color={'white'}
                    size={responsiveHeight(3)}
                    style={{ alignSelf: 'center', }}
                  />
                  <Text style={styles.text1}>
                    {this.state.lan ? "Einstellungen" : "settings"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('changePassword');
                }}
                style={styles.tab}>
                <View style={styles.iconView}>
                  <AntDesign
                    name={'downcircleo'}
                    color={'white'}
                    size={responsiveHeight(3)}
                    style={{}}
                  />
                  <Text style={styles.text1}>
                    {this.state.lan ? "Passwort ändern" : "Change Password"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('About');
                }}
                style={styles.tab}>
                <View style={styles.iconView}>
                  <AntDesign
                    name={'infocirlceo'}
                    color={'white'}
                    size={responsiveHeight(3)}
                    style={{ alignSelf: 'center', }}
                  />
                  <Text style={styles.text1}>
                    {this.state.lan ? "Informationen" : "About"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={

                  async () => {

                    this.props.navigation.navigate('timeInterval');
                  }}
                style={styles.tab}>
                <View style={styles.iconView}>

                  <Ionicons name="timer-outline" color={'white'}
                    size={responsiveHeight(3)} />
                  <Text style={styles.text1}>
                    {this.state.lan ? "Zeitintervall" : "Time Interval"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => this.Logout()
                }
                style={styles.tab}>
                <View style={styles.iconView}>
                  <MaterialIcons
                    name={'logout'}
                    color={'white'}
                    size={responsiveHeight(3)}
                    style={{ transform: [{ rotate: '270deg' }] }}
                  />
                  <Text style={styles.text1}>
                    {this.state.lan ? "Ausloggen" : " Log out"}

                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }

        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464646',
  },
  profileView: {
    flexDirection: 'row',
    //marginTop:30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: responsiveWidth(6),
    // backgroundColor: 'white',

  },
  image: {
    height: responsiveHeight(5.5),
    width: responsiveHeight(26.2),
    // marginHorizontal: responsiveWidth(3),
    top: 5
  },

  imageDrawer: {
    height: responsiveHeight(7),
    width: responsiveHeight(6),
  },
  bottomContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: responsiveWidth(15),
  },
  text: {
    fontSize: responsiveFontSize(1.3),
    //fontFamily: 'bold',
    marginLeft: responsiveWidth(4),
  },
  text1: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    textAlign: 'center',
    marginHorizontal: responsiveHeight(2)
  },
  tab: {
    flexDirection: 'row',
    margin: responsiveHeight(1.5),
  },
  icon: {
    height: responsiveHeight(6),
    width: responsiveHeight(5),
    marginTop: responsiveHeight(2),
  },
  buttonText:
  {
    fontSize: responsiveFontSize(1.8),
    color: 'grey',
    fontWeight: 'bold'
  },
  button1:
  {
    height: responsiveHeight(7),
    width: responsiveWidth(43),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: responsiveWidth(5),
    backgroundColor: '#4f95e0'

  },
  iconBack: {
    padding: 13,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveHeight(2)
  },
});
