import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import { realtimeDb } from './FirebaseService';

const inititalData: any = {
    CTratio: undefined,
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
    Fmode: undefined,
    Freq: 50,
    I1: 16,
    Irms: {
        Irms1: 10,
        Irms2: 10,
        Irms3: 10,
    },
    MI: {
        I1: [],
        I2: [],
        I3: [],
    },
    MStep: {
        MStep1: 0,
        MStep2: 1,
        MStep3: 2,
        MStep4: 3,
    },
    MV: {
        A: [],
        B: [],
        C: [],
    },
    Man: false,
    PFSet: undefined,
    PFcomped: {
        PFload0: 0,
        PFload1: undefined,
        PFload2: undefined,
        PFload3: undefined,
    },
    PFload: {
        PFload0: 0,
        PFload1: undefined,
        PFload2: undefined,
        PFload3: undefined,
    },
    Pcomped: {
        Pcomped0: 0,
        Pcomped1: 0,
        Pcomped2: 0,
        Pcomped3: 0,
    },
    Pload: {
        Pload0: 0,
        Pload1: 0,
        Pload2: 0,
        Pload3: 0,
    },
    Qcomped: {
        Qcomped0: 0,
        Qcomped1: 0,
        Qcomped2: 0,
        Qcomped3: 0,
    },
    Qload: {
        Qload0: 0,
        Qload1: 0,
        Qload2: 0,
        Qload3: 0,
    },
    Qtsc: {
        Qtsc0: 0,
        Qtsc1: 0,
        Qtsc2: 0,
        Qtsc3: 0,
    },
    S1: true,
    S2: true,
    S3: true,
    S4: true,
    S5: true,
    Scomped: {
        Scomped0: 0,
        Scomped1: 0,
        Scomped2: 0,
        Scomped3: 0,
    },
    Selectmode: true,
    Sload: {
        Sload0: 0,
        Sload1: 0,
        Sload2: 0,
        Sload3: 0,
    },
    Start: true,
    Status: true,
    Steps: {
        Steps0: 0,
        Steps1: 0,
        Steps2: 0,
        Steps3: 0,
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
