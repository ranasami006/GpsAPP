import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, View, Text,Image,StyleSheet,Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import signIn from './Screens/signIn'
import CustomDrawer from './Drawer/CustomeDrawer'
import forgotPassword from './Screens/forgotPassword'
import profilePic from './Screens/profilePic'
import ProfileView from './Screens/ProfileView'
import changeNumber from './Screens/changeNumber'
import verificationCode from './Screens/verificationCode'
import changePassword from './Screens/changePassword'
import languges from './Screens/languges'
import About from './Screens/About'
import settings from './Screens/settings'

const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

const Main = () => {
  return (

      <MainStack.Navigator initialRouteName="signIn" screenOptions={{ headerShown: false, gestureEnabled: true }} >
          <MainStack.Screen name="signIn" component={signIn} />
          <MainStack.Screen name="forgotPassword" component={forgotPassword} />
          <MainStack.Screen name="profilePic" component={profilePic} />
          <MainStack.Screen name="ProfileView" component={ProfileView} />
        
          <MainStack.Screen name="changeNumber" component={changeNumber} />
          <MainStack.Screen name="verificationCode" component={verificationCode} />
          <MainStack.Screen name="changePassword" component={changePassword} />
          <MainStack.Screen name="languges" component={languges} />
          <MainStack.Screen name="About" component={About} />
          <MainStack.Screen name="settings" component={settings} />
       
          {/* <MainStack.Screen name="Screen2" component={Screen2} />
          <MainStack.Screen name="Screen3" component={Screen3} />
          <MainStack.Screen name="Screen4" component={Screen4} />
           <AppTabNavigator.Screen name="Home" component={Home} /> */}
            {/* <AppTabNavigator.Screen name="Screen2" component={Screen2} />
          <AppTabNavigator.Screen name="Screen3" component={Screen3} /> */}
           
      </MainStack.Navigator>
  );

}

Main.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.key > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};



export default App=()=> {
  return (
    <NavigationContainer>
  <Drawer.Navigator initialRouteName="Main"
  drawerPosition="right"
    edgeWidth={0}
    drawerContent={props => <CustomDrawer {...props} />}
    statusBarAnimation={'slide'}
    //hideStatusBar={true}
      drawerStyle={{
        backgroundColor: '#fff',
        width: responsiveWidth(70),
        borderTopRightRadius: 5,
    }}>
    
    <Drawer.Screen name="Main" component={Main} />
</Drawer.Navigator>
</NavigationContainer> 
  );
}

