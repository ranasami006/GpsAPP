import * as firebase from 'firebase';
export async function connectFirebase() {
    //   // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD1XRyq0hmpcPe6bQFe4bk80YkaS1epPto",
        authDomain: "gps-web-cf921.firebaseapp.com",
        databaseURL: "https://gps-web-cf921-default-rtdb.firebaseio.com",
        projectId: "gps-web-cf921",
        storageBucket: "gps-web-cf921.appspot.com",
        messagingSenderId: "358885136837",
        appId: "1:358885136837:web:12b4846c51851bd3b713ac"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
        console.log('Firebase connected ');
    }
}