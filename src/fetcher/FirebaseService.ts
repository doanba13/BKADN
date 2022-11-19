import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';

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

const inititalData = {
    CTratio: 26.66,
    CompMan: {},
    CompON: {},
    Fmode: true,
    Freq: 50,
    I1: 16,
    Irms: {},
    MStep: {},
    Man: true,
    PFSet: 0.95,
    PFload: {},
    Pcomped: {},
    Pload: {},
    Qcomped: {},
    Qload: {},
    Qtsc: {},
    Scomped: {},
    Selectmode: true,
    Sload: {},
    Start: true,
    Status: true,
    Steps: {},
    TDHV: {},
    V1: 60,
    Vrms: {},
};

export const useGetData = () => {
    const [data, setData] = useState(inititalData);
    useEffect(() => {
        onValue(ref(realtimeDb), (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, []);

    return data;
};
