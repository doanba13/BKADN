import create from 'zustand';

interface Chart {
    pfComp: { pfComp1: any; pfComp2: any; pfComp3: any };
    pfLoad: { pfLoad1: any; pfLoad2: any; pfLoad3: any };
    setComp: (data: any) => void;
    setLoad: (data: any) => void;
}

export const useChartContext = create<Chart>()((set) => ({
    pfComp: { pfComp1: [], pfComp2: [], pfComp3: [] },
    pfLoad: { pfLoad1: [], pfLoad2: [], pfLoad3: [] },
    setComp: (data) => set(() => ({ pfComp: data })),
    setLoad: (data) => set(() => ({ pfLoad: data })),
}));
