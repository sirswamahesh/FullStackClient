import firebase from 'firebase/compat/app'
import  'firebase/compat/storage'
import  'firebase/compat/auth'
import  'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCU3Xw1e0rTdnCAM6QJlPQiQDVy0BEGfDo",
    authDomain: "whatsapp-9278f.firebaseapp.com",
    projectId: "whatsapp-9278f",
    storageBucket: "whatsapp-9278f.appspot.com",
    messagingSenderId: "292819424191",
    appId: "1:292819424191:web:2159e27676165a9a26470a",
    measurementId: "G-R5BNC91ESQ"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export  {firebase};