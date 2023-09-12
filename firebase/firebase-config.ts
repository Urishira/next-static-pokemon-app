import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'pokemon-next-app.firebaseapp.com',
  projectId: 'pokemon-next-app',
  storageBucket: 'pokemon-next-app.appspot.com',
  messagingSenderId: '1035933915708',
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
