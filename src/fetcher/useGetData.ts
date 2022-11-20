import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import { realtimeDb } from './FirebaseService';

const inititalData: any = {
    CTratio: 26.66,
    CompMan: {
        CompMan1: 0,
        CompMan2: 1,
        CompMan3: 2,
        CompMan4: 3,
    },
    CompON: {
        CompON1: 0,
        CompON2: 1,
        CompON3: 2,
        CompON4: 3,
    },
    Fmode: 1,
    Freq: 50,
    I1: 16,
    Irms: {
        Irms1: 10,
        Irms2: 10,
        Irms3: 10,
    },
    MI: {
        V1: [],
        V2: [],
        V3: [],
    },
    MStep: {
        MStep1: 0,
        MStep2: 1,
        MStep3: 2,
        MStep4: 3,
    },
    MV: {
        V1: [],
        V2: [],
        V3: [],
    },
    Man: true,
    PFSet: 0.95,
    PFcomped: {
        PFload0: 1000,
        PFload1: 1000,
        PFload2: 1000,
        PFload3: 1000,
    },
    PFload: {
        PFload0: 1000,
        PFload1: 1000,
        PFload2: 1000,
        PFload3: 1000,
    },
    Pcomped: {
        Pcomped0: 1000,
        Pcomped1: 1000,
        Pcomped2: 1000,
        Pcomped3: 1000,
    },
    Pload: {
        Pload0: 1000,
        Pload1: 1000,
        Pload2: 1000,
        Pload3: 1000,
    },
    Qcomped: {
        Qcomped0: 1000,
        Qcomped1: 1000,
        Qcomped2: 1000,
        Qcomped3: 1000,
    },
    Qload: {
        Qload0: 55,
        Qload1: 55,
        Qload2: 55,
        Qload3: 1000,
    },
    Qtsc: {
        Qtsc0: 1000,
        Qtsc1: 1000,
        Qtsc2: 1000,
        Qtsc3: 1000,
    },
    S1: true,
    S2: true,
    S3: true,
    S4: true,
    S5: true,
    Scomped: {
        Scomped0: 1000,
        Scomped1: 1000,
        Scomped2: 1000,
        Scomped3: 1000,
    },
    Selectmode: true,
    Sload: {
        Sload0: 1000,
        Sload1: 1000,
        Sload2: 1000,
        Sload3: 1000,
    },
    Start: true,
    Status: true,
    Steps: {
        Steps0: 1000,
        Steps1: 1000,
        Steps2: 1000,
        Steps3: 1000,
    },
    Submit: true,
    THDV: {
        THDV1: 0.05,
        THDV2: 0.05,
        THDV3: 0.05,
    },
    THDI: {
        THDI1: 0.05,
        THDI2: 0.05,
        THDI3: 0.05,
    },
    V1: 60,
    Vrms: {
        Vrms1: 202,
        Vrms2: 221,
        Vrms3: 222,
    },
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
