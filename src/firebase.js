// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh5_2E1eQHk6uM1lvVE4-QQn1bRzGo9f4",
  authDomain: "think-piece-live-7d54e.firebaseapp.com",
  projectId: "think-piece-live-7d54e",
  storageBucket: "think-piece-live-7d54e.appspot.com",
  messagingSenderId: "7731439253",
  appId: "1:7731439253:web:534efdb95cd48f38015d9c",
  measurementId: "G-2GRCZGFDK5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
export default firebase;