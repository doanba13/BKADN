import create from 'zustand';

import { getUserLanguage } from '@/util/LocalStorageUtil';

interface Lang {
    lang: string;
    setLanguage: (language: string) => void;
}

const language = getUserLanguage();

export const useLangContext = create<Lang>()((set) => ({
    lang: language,
    setLanguage: (language) => set(() => ({ lang: language })),
}));
