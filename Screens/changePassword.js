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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class changePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            currPassword:'',
            confirmpassword: '',
            isEnabled:false,
        }
    }   
    _handleToggleSwitch = () =>
    this.setState(state => ({
        isEnabled: !state.isEnabled,
    }));
    async componentDidMount() {

    }

    async UpdatePassword(){
        let success= await updatePassword(this.state.newpassword);
        if(success){
            alert('Password is successfuly reset');
            this.props.navigation.navigate('signIn');
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
                this.UpdatePassword();
                break;
            case 1:
                this.setState({ loader: false });
                break;
            default:
                break;
        }
    }
    async CheckValidateFn() {  
        let reg1 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (reg1.test(this.state.currPassword) === false) {
            this.state.currPassword === ''
                ? this.setState({ ErrorMessege: 'Current password cannot not be empty' })
                : this.state.currPassword.length > 7
                    ? this.setState({ ErrorMessege: 'Please enter proper current password that contains at least one letter, one number and one special character ' })
                    : this.setState({
                        ErrorMessege: 'Current password should be atleast 8 characters!',
                    });
            // this.setState({ email: text })
            return 1;
        }

        let reg2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (reg2.test(this.state.newpassword) === false) {
            this.state.newpassword === ''
                ? this.setState({ ErrorMessege: ' New Password cannot not be empty' })
                : this.state.newpassword.length > 7
                    ? this.setState({ ErrorMessege: 'Please enter proper new password that contains at least one letter, one number and one special character ' })
                    : this.setState({
                        ErrorMessege: 'New password should be atleast 8 characters!',
                    });
            // this.setState({ email: text })
            return 1;
        }

        if(this.state.newpassword!=this.state.confirmpassword){
        this.setState({ ErrorMessege: 'New password and confirm password should be same' })
            return 1;    
    }
        return 0;
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
                    <Text style={{ textAlign: 'center', 
                    fontSize: responsiveFontSize(4), 
                    fontWeight: '600' }}>Change Password</Text>

                    <View style={styles.bottomform}>
                        <View style={styles.passwordView}>
                            <TextInput
                                ref={(input) => this._password = input}

                                style={styles.textinput}
                                secureTextEntry={this.state.isEnabled}
                                placeholder={'Current Password'}
                                placeholderTextColor={'grey'}
                                placeholderStyle={{ marginLeft: responsiveHeight(5) }}
                                value={this.state.currPassword}
                                onChangeText={(text) => {
                                    this.setState({ currPassword: text });
                                }}
                            />
                        </View>

                        <View style={styles.passwordView}>
                            <TextInput
                                ref={(input) => this._password = input}

                                style={styles.textinput}
                                secureTextEntry={this.state.isEnabled}
                                placeholder={'New Password'}
                                placeholderTextColor={'grey'}
                                placeholderStyle={{ marginLeft: responsiveHeight(5) }}
                                
                                value={this.state.newpassword}
                                onChangeText={(text) => {
                                    this.setState({ newpassword: text });
                                }}
                            />
                        </View>
                        <View style={styles.passwordView}>
                            <TextInput
                                ref={(input) => this._password = input}

                                style={styles.textinput}
                                secureTextEntry={this.state.isEnabled}
                                placeholder={'Confirm Password'}
                                placeholderTextColor={'grey'}
                                placeholderStyle={{ marginLeft: responsiveHeight(5) }}
                                
                                value={this.state.confirmpassword}
                                onChangeText={(text) => {
                                    this.setState({ confirmpassword: text });
                                }}
                            />
                        </View>
                           <View style={{justifyContent:'flex-end',alignContent:'flex-end',flexDirection:'row',margin:responsiveHeight(1)}}>    
                            <Text style={{alignSelf:'center',textAlign:'right',fontSize:responsiveFontSize(1.3),marginLeft:3}}>Show</Text>
                            <Switch
                                trackColor={{ false: '#e3e3e3', true: '#464646' }}
                                thumbColor={this.state.isEnabled ? 'black' : '#f0f0f0'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this._handleToggleSwitch}
                                value={this.state.isEnabled}
                                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                            />
                            </View> 
                      <Text style={{ textAlign: 'center', color: 'red', fontSize: responsiveFontSize(2),padding:responsiveHeight(2) }}>{this.state.ErrorMessege}</Text>
                       
                      </View>
                      
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                            this.ValidationFn();
                           // this.props.navigation.navigate('Tab');
                        }}>
                        {
                            this.state.loader ?
                                <ActivityIndicator size={'large'} color={'white'} />
                                :
                                <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
                        }

                    </TouchableOpacity>
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
        // marginTop: responsiveHeight(5),
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
