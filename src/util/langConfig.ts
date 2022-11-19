import en from '@/lang/en.json';

export const LANGUAGE_EN = 'en';

interface LocaleConfig {
    [key: string]: any;
}

export const languageConfig: LocaleConfig = {
    en: {
        messages: en,
        locale: LANGUAGE_EN,
    },
    // Todo: add new language
};
