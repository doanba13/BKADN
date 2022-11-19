import { useCallback } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { trackPromise } from 'react-promise-tracker';
import axios, { AxiosRequestConfig, Method } from 'axios';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';

import { isAxiosError } from '@/pages/ErrorFallbackPage';
import { getAccessToken, updateAccessToken } from '@/util/AuthStorage';
import History from '@/util/History';
import { CLIENT_ID, LOGIN_URL, SECRET, SUBSCRIBER_PAGE_URL, URL_REFRESH_TOKEN } from '@/util/Keyword';
import { clearUserInfo, KEY_DEVICE_ID, KEY_PHONE_NUMBER } from '@/util/LocalStorageUtil';

import useApi, { defaultApiFactory, initialLoadingDataState, LoadingDataState } from '../util/UseApi';

export const HEADER_AUTHORIZATION = 'Authorization';
export const HEADER_APIKEY = 'x-api-key';
const axiosConfig: AxiosRequestConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const axiosWithInterceptors = axios.create(axiosConfig);

function getSign(config: AxiosRequestConfig) {
    const params = qs.stringify(config.params, { arrayFormat: 'repeat' });
    const url = config.url + '?' + params;
    const encrypted = crypto.createHmac('sha1', SECRET).update(url).digest('base64');
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_');
}

function addAccessTokenInterceptor(): number {
    // Request interceptor for API calls
    return axiosWithInterceptors.interceptors.request.use(
        async (config) => {
            config.params = {
                ...config.params,
                requestTime: new Date().getTime(),
            };
            config.headers[HEADER_AUTHORIZATION] = 'Bearer ' + getAccessToken();
            config.headers[HEADER_APIKEY] = CLIENT_ID + ':' + getSign(config);
            return config;
        },
        (error) => error,
    );
}

addAccessTokenInterceptor();

const unauthorizedResponseInterceptor = async (error: any) => {
    if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
        return Promise.reject(error);
    }
    const isLoggedIn = localStorage.getItem(KEY_PHONE_NUMBER);
    if (isLoggedIn == null) {
        History.push(LOGIN_URL);
    } else {
        const originalRequest = error.config;

        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const accessToken = await refreshAccessToken();
                updateAccessToken(accessToken);
                return axiosWithInterceptors(originalRequest);
            } catch (e) {
                if (isAxiosError(e) && e?.response?.status === StatusCodes.UNAUTHORIZED) {
                    clearUserInfo();
                    History.push(LOGIN_URL);
                }
                return Promise.reject(e);
            }
        }
    }
    return Promise.reject(error);
};

const paymentRequiredResponseInterceptor = async (error: any) => {
    if (error.response?.status === StatusCodes.PAYMENT_REQUIRED) {
        History.push(SUBSCRIBER_PAGE_URL);
    }
    return Promise.reject(error);
};

async function refreshAccessToken() {
    const phoneNumber = localStorage.getItem(KEY_PHONE_NUMBER);
    const deviceId = localStorage.getItem(KEY_DEVICE_ID);
    const result = await axios.get(URL_REFRESH_TOKEN, {
        params: {
            'phone-number': phoneNumber,
            'device-id': deviceId,
        },
    });
    return result.data.accessToken;
}

// Response interceptor for API calls
axiosWithInterceptors.interceptors.response.use((response) => response, unauthorizedResponseInterceptor);
axiosWithInterceptors.interceptors.response.use((response) => response, paymentRequiredResponseInterceptor);

const EXPECTED_STATUS_CODE = [StatusCodes.PAYMENT_REQUIRED, StatusCodes.UNAUTHORIZED];
export const useFetch = <T,>(
    endpoint: string,
    verb: Method = 'GET',
): [
    LoadingDataState<T>,
    (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>,
] => {
    const apiHandler = useApi<T>(defaultApiFactory, initialLoadingDataState);
    const errorBoundaryHandler = useErrorHandler();
    const makeRequest = useCallback(
        async (area?: string | undefined, expectedErrorStatus?: number[], requestBody?: Record<string, any>) => {
            trackPromise(
                axiosWithInterceptors
                    .request({
                        method: verb,
                        paramsSerializer: (params) => {
                            return qs.stringify(params, { arrayFormat: 'repeat' });
                        },
                        params: verb == 'GET' ? requestBody : null,
                        data: verb != 'GET' ? requestBody : null,

                        url: endpoint,
                    })
                    .then((response) => {
                        apiHandler.receiveSuccess(response.data);
                    })
                    .catch((e) => handleRequestError(e)),
                area,
            );

            function handleRequestError(error: any) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    const isExpectedError =
                        expectedErrorStatus?.includes(error.response.status) ||
                        EXPECTED_STATUS_CODE.includes(error.response.status);
                    if (isExpectedError) {
                        apiHandler.receiveError(error.response.data);
                        return;
                    }
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Unknown Error' + error.message);
                }
                //todo: this will lead to the current page rerender then show error page; find a way to avoid rerender
                apiHandler.receiveError(error.response.data);
                errorBoundaryHandler(error);
            }
        },
        [endpoint, verb],
    );

    return [apiHandler.loadingDataState, makeRequest];
};
