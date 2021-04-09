import * as firebase from 'firebase'
//import 'firebase/firestore';
import { saveData,getData,saveInitialData } from "./utility";
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function signInFirebase(email, password) {
    let success = true;
    // connectFirebase();
    await firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        
        let userinfo = await getData('users', user.user.uid);
          if (userinfo.isActive) {
          console.log("Welcome pak",user.user.uid)
       
             AsyncStorage.setItem('Token', user.user.uid);
           } else {
          success = false;
          await firebase.auth().signOut();
          alert('Invalid User!');
        }
    
      })
      .catch(function(error) {
        success = false;
        alert(error.code + ': ' + error.message);
      });
    return success;
  }

  export async function passwordReset(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  export async function updatePassword(newPassword){
    let success = true;
    var user = firebase.auth().currentUser;
    console.log("ME HOO ",user)
    user.updatePassword(newPassword).then(function() {
        console.log("I am ok")
      }).catch(function(error) {
        success=false;
      });
      return success;
  }