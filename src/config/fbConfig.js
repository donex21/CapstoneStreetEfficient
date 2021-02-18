import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCkKdsnROjPsKmch1Vgi23RDvUDzeDOsPw",
    authDomain: "street-effecient-firebase.firebaseapp.com",
    projectId: "street-effecient-firebase",
    storageBucket: "street-effecient-firebase.appspot.com",
    messagingSenderId: "10883215181",
    appId: "1:10883215181:web:3794e2c7e3b206e0cd1104"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebase.firestore().settings({ timestampsInSnapshots: true});
 
export default firebase;
  