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
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData)=>{
  if(!user) return;

  // Checking if document/user even exists at all or not in the database i.e by getting reference to it which is different from snapshot i.e. actual data 

  const userRef = firestore.doc(`users/${user.uid}`)
  // Fetch user from that place 
  const snapshot = await userRef.get();
  
  if(!snapshot.exists){
    const {displayName, email, photoURL} = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName, 
        email,
        photoURL,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.error("Error creating user ", error);
    }
  }
  return getUserDocument(user.uid);
}

export const getUserDocument = async (uid) => {
  if(!uid) return null;
  try {
    const userDocument = await (await firestore.collection("users").doc(uid).get()).data();
    return {uid, ...userDocument};
  } catch (error) {
    console.error("Error Fetching user ",error.message);
  }
}
export default firebase;