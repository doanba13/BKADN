import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyD8joraiEU3jJzv6ooO9H92kgm-TcnwDnA',
    authDomain: 'tsc1-9acdf.firebaseapp.com',
    databaseURL: 'https://tsc1-9acdf-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tsc1-9acdf',
    storageBucket: 'tsc1-9acdf.appspot.com',
    messagingSenderId: '580513025407',
    appId: '1:580513025407:web:1c1b8ff1cf7b41eeb1de4a',
    measurementId: 'G-0HVDRXYMW3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(app);
