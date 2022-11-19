import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';

export type LoadingDataState<S> = {
    data?: S;
    error?: { code: number; message: string };
};

export const initialLoadingDataState: LoadingDataState<any> = {
    data: undefined,
    error: undefined,
};

export interface ResponseData<T> {
    data: T;
}

const useApi = <T,>(
    apiFactory: <T>(
        state: LoadingDataState<T>,
        setState: React.Dispatch<React.SetStateAction<LoadingDataState<T>>>,
    ) => {
        resetDataState: () => void;
        receiveError: (response: { code: number; message: string }) => void;
        receiveSuccess: (response: T) => void;
        loadingDataState: LoadingDataState<T>;
    },
    initialState: LoadingDataState<T>,
) => {
    const [state, setState] = useState(initialState);
    return useMemo(() => apiFactory(state, setState), [state, setState, apiFactory]);
};

export default useApi;

export const defaultApiFactory = <T,>(
    state: LoadingDataState<T>,
    setState: Dispatch<SetStateAction<LoadingDataState<T>>>,
) => {
    const resetDataState = () => {
        setState(initialLoadingDataState);
    };

    const receiveSuccess = (response: T) => {
        setState({ data: response, error: undefined });
    };

    const receiveError = (response: { code: number; message: string }) => {
        setState({ error: response, data: undefined });
    };

    return {
        resetDataState: resetDataState,
        receiveSuccess: receiveSuccess,
        receiveError: receiveError,
        loadingDataState: state,
    };
};
