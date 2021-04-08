import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    Button, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
    ImageBackground, TextInput,
    ActivityIndicator,ScrollView
} from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, DrawerActions } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//const navigation = useNavigation();
export default class ProfileView extends Component {

    state = {
        password: '',
        email: '',
        image1: '',
    }
    async componentDidMount() {

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
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light', backgroundColor: 'black' }}
                    barStyle="light-content" // or directly

                    centerComponent={{
                        text: 'Profile', 
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

                    <TouchableOpacity style={styles.profilePic}
                        onPress={() => this.imagePicker1()}
                    >
                        {!this.state.image1 ? (
                            <Text style={{ color: '#464646', textAlign: 'center', 
                            fontSize: responsiveFontSize(2.5), 
                            fontWeight: '700',}}>
                                No image
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

                    </TouchableOpacity>

                    <View style={styles.bottomform}>
                        <Text style={styles.headertext1}>Name</Text>

                        <TextInput
                            style={styles.textinput}
                            placeholder={'hello'}
                            placeholderTextColor={'grey'}
                            onSubmitEditing={() => this._password.focus()}
                            returnKeyType="next"
                            returnKeyLabel="next"
                            value={this.state.email}
                            onChangeText={(text) => {
                                this.setState({ email: text });
                            }}
                        />
                        <Text style={styles.headertext1}>User Name</Text>

                        <TextInput
                            style={styles.textinput}
                            placeholder={'user name'}
                            placeholderTextColor={'grey'}
                            onSubmitEditing={() => this._password.focus()}
                            returnKeyType="next"
                            returnKeyLabel="next"
                            value={this.state.email}
                            onChangeText={(text) => {
                                this.setState({ email: text });
                            }}
                        />
                        <Text style={styles.headertext1}>Phone Number</Text>
                        <View style={styles.passwordView}>
                            <TextInput
                                ref={(input) => this._password = input}

                                style={styles.textinput}
                               // secureTextEntry={this.state.secured}
                                placeholder={'+12 3311 1111'}
                                placeholderTextColor={'grey'}
                                placeholderStyle={{ marginLeft: responsiveHeight(5) }}
                                keyboardType={"numeric"}
                                value={this.state.password}
                                onChangeText={(text) => {
                                    this.setState({ password: text });
                                }}
                            />
                            {/* <View style={{
                                    backgroundColor:'white',                                  
                                    zIndex: 1,
                                    right: 10,
                                }}> */}
                            {/* <AntDesign style={styles.eyeIcon} name="eyeo" size={20} color='#757575' /> */}
                            {/* </View> */}
                        </View>
                       
                        <Text style={{ textAlign: 'center', 
                        color: '#220764', 
                        fontSize: responsiveFontSize(2) }}>{this.state.ErrorMessege}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                            // this.ValidationFn();
                         this.props.navigation.navigate('changeNumber');
                        }}>
                        {
                            this.state.loader ?
                                <ActivityIndicator size={'small'} />
                                :
                                <Text style={[styles.buttonText, { color: '#fff' }]}>Edit profile</Text>
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
        marginTop:responsiveHeight(2)
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
        justifyContent:'center',alignContent:'center',alignItems:'center'
    }

});
