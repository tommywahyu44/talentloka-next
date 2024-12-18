// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFEDh1mgzKIeybGniFhvrKQ0OtNDz-LXM',
  authDomain: 'talentloka-35463.firebaseapp.com',
  databaseURL: 'https://talentloka-35463-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'talentloka-35463',
  storageBucket: 'talentloka-35463.firebasestorage.app',
  messagingSenderId: '192512140674',
  appId: '1:192512140674:web:97820c1a8d1f84dd011b9b',
  measurementId: 'G-5E4G1N7S1Y',
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const fireAuth = getAuth(firebase)
const functions = getFunctions(firebase, 'asia-southeast1')
const firestore = getFirestore(firebase)
const database = getDatabase(firebase)

export { database, fireAuth, firebase, firestore, functions }
