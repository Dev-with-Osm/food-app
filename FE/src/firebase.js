// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'food-app-1138b.firebaseapp.com',
  projectId: 'food-app-1138b',
  storageBucket: 'food-app-1138b.appspot.com',
  messagingSenderId: '1067237278226',
  appId: '1:1067237278226:web:4639f64521bd544906cecb',
  measurementId: 'G-RCD3F1EJSV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
