// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCcGuXkcdRcjRTMMqPKqcJkwzIKVUaAvgk',
  authDomain: 'hireplace.firebaseapp.com',
  databaseURL: 'https://hireplace-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'hireplace',
  storageBucket: 'hireplace.appspot.com',
  messagingSenderId: '94209867011',
  appId: '1:94209867011:web:23aae6710867a787997d36',
  measurementId: 'G-ZJHNLGFT7T',
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const fireAuth = getAuth(firebase)
const functions = getFunctions(firebase, 'asia-southeast1')
const firestore = getFirestore(firebase)

export { fireAuth, firebase, functions, firestore }
