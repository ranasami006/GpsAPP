import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    Button, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
    ImageBackground, TextInput,
    ActivityIndicator, ScrollView
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
import {saveData,uploadProductImage} from '../Screens/Firebase/utility'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class editProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.Item.name,
            email: this.props.route.params.Item.email,
            image1: this.props.route.params.image,
            phone:this.props.route.params.phone,
            Userdata:this.props.route.params.Item,
        }
    }
    async componentDidMount() {
       
    }
    async UpdateProfile(){
        let userId= await AsyncStorage.getItem("Token");
        let success= await saveData('users',userId,
            {
                name: this.state.name,
                image:  this.state.downloadURL?
                this.state.downloadURL
                :this.state.image1?
                this.state.image1
                :null,
                phone:this.state.phone,
            }           
            
            );
        
        if(success){
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
                this.UpdateProfile();
                break;
            case 1:
                this.setState({ loader: false });
                break;
            default:
                break;
        }
    }
    async CheckValidateFn() {
        let reg3 = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
        if (reg3.test(this.state.name) === false) {
            this.state.name !== undefined && this.state.name !== ''
                ? this.setState({
                    ErrorMessege: 'Name can only contain letters of the alphabets',
                })
                : this.setState({ ErrorMessege: 'Name cannot be empty' });
            return 1;
        }
        return 0;
    }


    imagePicker1 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image1: result.uri });
            let downloadURL = await uploadProductImage(result.uri, this.state.name );
            this.setState({
                downloadURL:downloadURL
            })
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light', backgroundColor: 'black' }}
                    barStyle="light-content" // or directly

                    centerComponent={{
                        text: 'Edit Profile',
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
                            <Text style={{
                                color: '#464646', textAlign: 'center',
                                fontSize: responsiveFontSize(2.5),
                                fontWeight: '700',
                            }}>
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
                            value={this.state.name}
                            onChangeText={(text) => {
                                this.setState({ name: text });
                            }}
                        />
                        <Text style={styles.headertext1}>User Name</Text>

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
                        <Text style={styles.headertext1}>Phone Number</Text>
                        <View style={styles.passwordView}>
                            <TextInput
                                ref={(input) => this._password = input}

                                style={styles.textinput}
                                // secureTextEntry={this.state.secured}
                                placeholder={'No phone number availble'}
                                placeholderTextColor={'grey'}
                                placeholderStyle={{ marginLeft: responsiveHeight(5) }}
                                keyboardType={"numeric"}
                               
                                value={this.state.phone}
                                onChangeText={(text) => {
                                    this.setState({ phone: text });
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

                        <Text style={{
                            textAlign: 'center',
                            color: '#220764',
                            fontSize: responsiveFontSize(2)
                        }}>{this.state.ErrorMessege}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                         this.ValidationFn();
                           // this.props.navigation.navigate('changeNumber');
                        }}>
                        {
                            this.state.loader ?
                                <ActivityIndicator size={'large'} color={'white'} />
                                :
                                <Text style={[styles.buttonText, { color: '#fff' }]}>Update profile</Text>
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
        justifyContent: 'center', alignContent: 'center', alignItems: 'center'
    }

});
