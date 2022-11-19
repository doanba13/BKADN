import { BroadcastChannel } from 'broadcast-channel';

let _accessToken = '';
const syncRefreshTokenChannel = new BroadcastChannel('refreshToken-data');
syncRefreshTokenChannel.addEventListener('message', (newAccessToken) => {
    _accessToken = newAccessToken;
});

export const updateAccessToken = (value: string) => {
    _accessToken = value;
    syncRefreshTokenChannel.postMessage(_accessToken);
};

export const getAccessToken = () => {
    return _accessToken;
};

const logoutChannel = new BroadcastChannel('logout-event');
logoutChannel.addEventListener('message', () => {
    _accessToken = '';
});
