import { v4 as uidv4 } from 'uuid';

export const KEY_PHONE_NUMBER = 'GST_PHONE_NUMBER';
export const KEY_DEVICE_ID = 'GST_DEVICE_ID';
export const KEY_LANGUAGE = 'language';

export const getOrCreateDeviceId = (): string | null => {
    let deviceId = localStorage.getItem(KEY_DEVICE_ID);
    if (!deviceId) {
        deviceId = 'WEB-' + uidv4();
        localStorage.setItem(KEY_DEVICE_ID, deviceId);
    }
    return deviceId;
};

export const clearUserInfo = () => {
    localStorage.removeItem(KEY_PHONE_NUMBER);
};

export const getUserLanguage = (): string => localStorage.getItem(KEY_LANGUAGE) || 'en';

export const setUserLanguage = (lang: string) => {
    localStorage.setItem(KEY_LANGUAGE, lang);
};
