import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    Button, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
    ImageBackground, TextInput,
    ActivityIndicator, ScrollView,
    FlatList,
    Switch,
    Alert
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//const navigation = useNavigation();
export default class languges extends Component {

    state = {
        password: '',
        email: '',
        isEnabled: 'false',
    }
    _handleToggleSwitch = () =>
        this.setState(state => ({
            isEnabled: !state.isEnabled,
        }));
    async componentDidMount() {

    }
    getListViewItem = (item) => {  
        Alert.alert(item.key);  
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
                    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(4), fontWeight: 'bold' }}>Languges</Text>

                    <View style={styles.bottomform}>
                    <FlatList  
                    data={[  
                        {key: 'Bosnain'},{key: 'Croatian'}, {key: 'Standard'},{key: 'Serbian'},  
                        {key: 'Slovanian'},{key: 'German'},{key: 'Turkish'},  
                        {key: 'Hungrian'},
                    ]}  
                    renderItem={({item}) =>  
                        <Text style={styles.item}  
                              onPress={this.getListViewItem.bind(this, item)}>{item.key}</Text>
}  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
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
    item:{
        color:'#464646',
        fontSize:responsiveFontSize(2.5),
        padding:responsiveHeight(1.5),
        fontWeight:'bold'
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
        // marginTop: responsiveWidth(-2),
    },


});
