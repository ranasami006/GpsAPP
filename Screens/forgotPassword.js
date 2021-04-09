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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { passwordReset } from '../Screens/Firebase/auth'
export default class forgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    async componentDidMount() {

    }
    async ForgotFn() {
        await passwordReset(this.state.email);
        alert('Please check your email to reset your password');
        this.props.navigation.navigate('signIn');


    }
    async ValidationFn() {
        this.setState({ loader: true, ErrorMessege: '' });
        let TempCheck = await this.CheckValidateFn();

        switch (TempCheck) {
            case 0:
                this.ForgotFn();
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
        let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg2.test(this.state.email) === false) {
            console.log('Email is Not Correct');
            this.state.email !== undefined && this.state.email !== ''
                ? this.setState({ ErrorMessege: 'Please enter proper Email Id' })
                : this.setState({ ErrorMessege: 'Email cannot be empty' });
            // this.setState({ email: text })
            return 1;
        }


        return 0;
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={require('../assets/image8.png')} style={styles.image}>

                    <Text style={styles.text}> Forgot Password</Text>

                    <View style={styles.bottomView}>



                        <View style={styles.bottomform}>
                            <Text style={styles.headertext1}>Email</Text>

                            <TextInput
                                style={styles.textinput}
                                placeholder={'Enter your recovery email'}
                                placeholderTextColor={'grey'}
                                onSubmitEditing={() => this._password.focus()}
                                returnKeyType="next"
                                returnKeyLabel="next"
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState({ email: text });
                                }}
                            />

                            {/* <View style={{
                                    backgroundColor:'white',                                  
                                    zIndex: 1,
                                    right: 10,
                                }}> */}
                            {/* <AntDesign style={styles.eyeIcon} name="eyeo" size={20} color='#757575' /> */}
                            {/* </View> */}

                            <Text style={{ textAlign: 'center', color: 'red', fontSize: responsiveFontSize(2) }}>{this.state.ErrorMessege}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => {
                                this.ValidationFn();

                            }}>
                            {
                                this.state.loader ?
                                    <ActivityIndicator size={'large'} color={'white'} />
                                    :
                                    <Text style={[styles.buttonText, { color: '#fff' }]}>Submit</Text>
                            }

                        </TouchableOpacity>
                    </View>


                </ImageBackground>
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
    },
    image: {
        width: windowWidth,
        height: windowHeight,
    },
    bottomView: {
        width: windowWidth,
        height: windowHeight / 1.3,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopEndRadius: responsiveHeight(8),
        borderTopStartRadius: responsiveHeight(8),
    },
    text: {
        color: 'white',
        fontSize: responsiveFontSize(4.5),
        fontWeight: "700",
        padding: responsiveHeight(2),
        marginTop: responsiveHeight(8),
        letterSpacing: 4,
    },
    bottomform: {
        marginTop: responsiveHeight(5),
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
        // marginTop: responsiveWidth(1),
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
