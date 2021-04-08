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
import * as ImagePicker from 'expo-image-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class profilePic extends Component {

    state = {
        password: '',
        email: '',
        image1: "",
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
    async componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={require('../assets/image8.png')} style={styles.image}>
                    <Text style={styles.text}>Add Picture</Text>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomform}>
                            <View style={styles.skipMainView}>
                                <TouchableOpacity style={styles.skipView} >
                                    <Text style={styles.headertext1}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.profilePic}
                                onPress={() => this.imagePicker1()}
                            >
                                {!this.state.image1 ? (
                                    <Text style={{ color: '#464646', 
                                    textAlign: 'center', 
                                    fontSize: responsiveFontSize(2.2), 
                                    fontWeight: '600', 
                                    marginTop: responsiveHeight(0) }}>
                                        Select image
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
                        </View>

                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => {
                                // this.ValidationFn();
                                 this.props.navigation.navigate('ProfileView');
                            }}>
                            {
                                this.state.loader ?
                                    <ActivityIndicator size={'small'} />
                                    :
                                    <Text style={[styles.buttonText, { color: '#fff' }]}>Add image</Text>
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
        marginTop: responsiveHeight(2),
        padding: responsiveHeight(3),
    },
    headertext1: {
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        color: 'white',
        alignSelf: 'center',

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
        marginTop:responsiveHeight(10),
    },
    buttonText: {
        fontSize: responsiveFontSize(3),
        color: 'white',
        fontWeight: 'bold',
    },
    skipView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#464646',
        borderRadius: responsiveHeight(2),
        width: responsiveHeight(8),
        height: responsiveHeight(4),
    },
    skipMainView: {
        justifyContent: "flex-end",
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },

    profilePic: {
        backgroundColor: '#e3e3e3',
        alignSelf: 'center',
        justifyContent:'center',
        alignContent:'center',
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    }

});
