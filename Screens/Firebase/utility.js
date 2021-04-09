import * as firebase from 'firebase'
import 'firebase/firestore';
import { exp } from 'react-native-reanimated';
import uuid from 'uuid';
export async function saveData(collection, doc, jsonObject) {
  let success= true
  const dbh = firebase.firestore();
  await dbh
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .then(function () {
      console.log("Document successfully written!");
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      success =false;
    });
    return success;
}

export function getData(collection, doc, objectKey) {
  const dbh = firebase.firestore();
  if (objectKey === undefined) {
    return dbh
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return dbh
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}
export async function getAllOfCollection(collection) {
  const dbh = firebase.firestore();

  let data = [];
  let querySnapshot = await dbh
    .collection(collection)
    .get();

  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectionWithStud(collection, id) {
  const dbh = firebase.firestore();

  let data = [];
  let querySnapshot = await dbh
    .collection(collection).where("ownerId", "==", id)
    .get();

  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function getAllOfCollectionWithCondition(collection, id) {
  const dbh = firebase.firestore();

  let data = [];
  let querySnapshot = await dbh
    .collection(collection).where("userId", "==", id)
    .get();

  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}



export async function saveDataWithoutDocId(collection, jsonObject) {
  const dbh = firebase.firestore();
  let upload = await dbh
    .collection(collection)
    .doc()
    .set(jsonObject);
  return upload;
}
export async function addToArray(collection, doc, array, value) {
  const dbh = firebase.firestore();
  await
    dbh
      .collection(collection)
      .doc(doc)
      .update({
        [array]: firebase.firestore.FieldValue.arrayUnion(value),
      });
}
export async function upDateData(collection, doc, jsonObject) {
  const dbh = firebase.firestore();
  await 
  dbh
    .collection(collection)
    .doc(doc)
    .update(jsonObject)
    .then(async () => {
      console.log('Document successfully written!');
      return true;
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
}
export async function saveInitialData(collection, userId) {
  const dbh = firebase.firestore();
  await dbh
     .collection(collection)
     .doc(userId)
     .set({userdocc: 'Me'})
     .then(function() {
       // alert("Data saved succesfuly");
     })
     .catch(function(error) {
       alert(error);
     });
 }

 export async function getAllOfCollectionwithSettings(collection, breedvalue, title, color,
  health, genetics, Registries) {
  const dbh = firebase.firestore();

  let data = [];
  let querySnapshot = await dbh
    .collection(collection).where("breedvalue", "==", breedvalue) .where( "title", "==", title )
    .where("color", "==", color) 
    .where("health", "==", health) 
    .where( "genetics", "==", genetics )
    .where( "Registries", "==", Registries )
    .get();

  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function uploadProductImage(uri,name) {
  try {
    console.log(uri)
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/"+ name);
    const task = ref.put(blob);
    
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {},
        err => {
          reject(err);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}

export async function UpdateuserDate(name,image,phone){
  var user = firebase.auth().currentUser;
let success=true
user.updateProfile({
  name: name,
  image: image,
  phone:phone,
}).then(function() {
  console.log("PAK pak oak ")
}).catch(function(error) {
  success=false;
});
return success
}

