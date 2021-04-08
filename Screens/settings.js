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
import { Ionicons,AntDesign,Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class settings extends Component {
    state = {
        password: '',
        email: '',
        isEnabled:'false',
    }
    _handleToggleSwitch = () =>
    this.setState(state => ({
        isEnabled: !state.isEnabled,
    }));
    async componentDidMount() {

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
                        height:responsiveHeight(11),
                    }}
                />
                <ScrollView style={styles.bottomView}>
                    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(4), fontWeight: 'bold' }}>Setting</Text>

                    <View style={styles.bottomform}>
                        <View style={{flexDirection:'row',marginTop:responsiveHeight(0)}}>
                        <Feather
                                name="user"
                                color={'#000'}
                                size={responsiveWidth(7)}
                                style={styles.iconHead}
                            />
                            <Text style={styles.headertext1}>Account</Text>
                        </View>
                        <TouchableOpacity style={styles.passwordView}
                        onPress={() => {
                            this.props.navigation.navigate('lanhuages');
                          }}
                        >
                        <Text style={{alignSelf:'center',fontSize:responsiveFontSize(2.5),color:'#757575'}}>Languge</Text>
                        <AntDesign
                                name="arrowright"
                                color={'#000'}
                                size={responsiveWidth(6)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                        <Feather
                                name="loader"
                                color={'#000'}
                                size={responsiveWidth(7)}
                                style={styles.iconHead}
                            />
                            <Text style={styles.headertext1}>Help</Text>
                        </View>
                        <TouchableOpacity style={styles.passwordView}
                        onPress={() => {
                            this.props.navigation.navigate('');
                          }}
                        >
                        <Text style={{alignSelf:'center',fontSize:responsiveFontSize(2.5),color:'#757575'}}>Help center</Text>
                        <AntDesign
                                name="arrowright"
                                color={'#000'}
                                size={responsiveWidth(6)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <View style={{flexDirection:'row'}}>
                        <AntDesign
                                name="downcircleo"
                                color={'#000'}
                                size={responsiveWidth(7)}
                                style={styles.iconHead}
                            />
                            <Text style={styles.headertext1}>Security</Text>
                        </View>
                        <TouchableOpacity style={styles.passwordView}
                        onPress={() => {
                            this.props.navigation.navigate('changePassword');
                          }}>
                        <Text style={{alignSelf:'center',fontSize:responsiveFontSize(2.5),color:'#757575'}}>Change password</Text>
                        <AntDesign
                                name="arrowright"
                                color={'#000'}
                                size={responsiveWidth(6)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                        <AntDesign
                                name="infocirlceo"
                                color={'#000'}
                                size={responsiveWidth(7)}
                                style={styles.iconHead}
                            />
                            <Text style={styles.headertext1}>About</Text>
                        </View>
                        <TouchableOpacity style={styles.passwordView}
                        onPress={() => {
                            this.props.navigation.navigate('About');
                          }}
                        >
                        <Text style={{alignSelf:'center',fontSize:responsiveFontSize(2.5),color:'#757575'}}>Date policy</Text>
                        <AntDesign
                                name="arrowright"
                                color={'#000'}
                                size={responsiveWidth(6)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        
                        style={[styles.passwordView,{marginBottom:responsiveHeight(8)}]}
                        onPress={() => {
                            this.props.navigation.navigate('About');
                          }}
                        
                        >
                        <Text style={{alignSelf:'center',fontSize:responsiveFontSize(2.5),color:'#757575'}}>Terms of use</Text>
                        <AntDesign
                                name="arrowright"
                                color={'#000'}
                                size={responsiveWidth(6)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>



                     </View>
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
       // marginTop: responsiveHeight(5),

    },
    bottomform: {
        // marginTop: responsiveHeight(5),
        padding: responsiveHeight(3),
    },
    headertext1: {
        fontSize: responsiveFontSize(2),
       alignSelf:'center',
        // marginTop: responsiveHeight(1),
       // marginBottom: responsiveHeight(1),
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
        height: responsiveHeight(8),
        elevation: 5,
        backgroundColor: 'white',
        width: windowWidth - 40,
        borderRadius: responsiveHeight(2),
        borderWidth: 0,
        paddingLeft: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        flexDirection:'row',
        justifyContent:'space-between'
        //padding:responsiveHeight(2)

    },
    button1: {
        height: responsiveHeight(9),
        width: responsiveWidth(45),
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
        alignSelf:'center',
        margin:responsiveHeight(2)
    },
    iconHead: {
        alignSelf:'center',
        margin:responsiveHeight(1)
    },

});
