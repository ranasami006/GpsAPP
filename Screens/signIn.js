import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    Button, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
    ImageBackground, TextInput,
    ActivityIndicator
} from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { AntDesign } from '@expo/vector-icons';
import { connectFirebase } from '../Screens/Firebase/config'
import { signInFirebase } from '../Screens/Firebase/auth'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class signIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            pageView:false,
            lan:true   
        }
    }
    async componentDidMount() {
        
        this.setState({
            pageView:true,
        })
        connectFirebase();
       
        let Token=  await AsyncStorage.getItem("Token");
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
        if(Token){
            this.props.navigation.navigate('ProfileView');
        }
        else{
            this.setState({
                email: '',
                password: '',
                pageView:false,
            })
        }
        this.setState({
            pageView:false,
        })
    
    }
    async LoginFn(){
        let email= this.state.email+"@gmail.com"
        let success= await signInFirebase
        (email,this.state.password);
        if(success){
            this.setState({ loader: false });
            this.props.navigation.navigate('ProfileView');
        }
        else{

            this.setState({ loader: false });
        }
        
      }
    async ValidationFn() {
        this.setState({ loader: true, ErrorMessege: '' });
        let TempCheck = await this.CheckValidateFn();

        switch (TempCheck) {
            case 0:
                this.LoginFn();
                break;
            case 1:
                this.setState({ loader: false });
                break;
            default:
                break;
        }
    }
    async CheckValidateFn() {
        //EmailCheck
        

       
        return 0;
    }

    render() {
        return (
            <>
            {
                this.state.pageView ?
                    <ActivityIndicator size={'large'} color={'black'} style={{marginTop:windowHeight/2 }}/>
            :
           
           <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={require('../assets/gpsappBackground.jpeg')} style={styles.image}>

                    <View style={styles.bottomView}>
                        <View style={styles.bottomform}>
                        <Text style={styles.text}>{this.state.lan?"Anmelden":"Sign In"}</Text>
                            <Text style={styles.headertext1}>{this.state.lan?"Nutzername":"User Name"}</Text>

                            <TextInput
                                style={styles.textinput}
                                placeholder={this.state.lan?"Geben Sie Ihren Benutzernamen ein":'Enter your user name'}
                                placeholderTextColor={'grey'}
                                onSubmitEditing={() => this._password.focus()}
                                returnKeyType="next"
                                returnKeyLabel="next"
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState({ email: text });
                                }}
                            />
                            <Text style={styles.headertext1}>{this.state.lan?"Passwort":"Password"}</Text>
                            <View style={styles.passwordView}>
                                <TextInput
                                    ref={(input) => this._password = input}

                                    style={styles.textinput}
                                    secureTextEntry={true}
                                    placeholder={this.state.lan?'Passwort eingeben':'Enter Password'}
                                    placeholderTextColor={'grey'}
                                    placeholderStyle={{ marginLeft: responsiveHeight(5) }}

                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({ password: text });
                                    }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => {

                                this.props.navigation.navigate('forgotPassword');
                            }}>
                                <Text style={{ textAlign: 'right', color: 'white', fontSize: responsiveFontSize(2), padding: responsiveHeight(1.3) }}>{this.state.lan?"Passwort vergessen?":"Forgot Password?"}</Text>
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: responsiveFontSize(2) }}>{this.state.ErrorMessege}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => {
                                this.ValidationFn();
                                //this.props.navigation.navigate('ProfileView');

                            }}>
                            {
                                this.state.loader ?
                                    <ActivityIndicator size={'large'} color={'white'}/>
                                    :
                                    <Text style={[styles.buttonText, { color: '#fff' }]}>{this.state.lan?"Einloggen":"Sign In"}</Text>
                            }

                        </TouchableOpacity>
                    </View>


                </ImageBackground>
            </View>
                    }
                    </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: windowWidth,
        height: windowHeight,
    },
    bottomView: {
        width: windowWidth,
        height:windowHeight/1.6,
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        marginTop:responsiveHeight(2),
    },
    text: {
        color: 'white',
        fontSize: responsiveFontSize(4.5),
        fontWeight: "700",
        padding: responsiveHeight(1.5),
        //marginTop: responsiveHeight(1),
        letterSpacing: 4,
        alignSelf:'center',
    },
    bottomform: {
       // marginTop: responsiveHeight(1),
        padding: responsiveHeight(2),
    },
    headertext1: {
        fontSize: responsiveFontSize(3),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        color:'white',
        fontWeight:'bold',
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
        width: 201,
        borderRadius: responsiveWidth(2),
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#464646',
        marginTop: responsiveWidth(-4),
    },
    buttonText: {
        fontSize: responsiveFontSize(3),
        color: 'white',
        fontWeight: 'bold',
    },
    eyeIcon: {
        alignSelf: "center",
        // backgroundColor:'white',                                  
        zIndex: 1,
        right: 10,
    }

});
