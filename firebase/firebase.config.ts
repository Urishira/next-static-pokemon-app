// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'pokemon-next-app.firebaseapp.com',
  projectId: 'pokemon-next-app',
  storageBucket: 'pokemon-next-app.appspot.com',
  messagingSenderId: '1035933915708',
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(clientCredentials)
const db = getFirestore()
export { app, db }
