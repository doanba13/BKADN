import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

export const Loader = ({
    contentLoader,
    children,
    loadingArea,
}: {
    contentLoader: React.ReactNode;
    children?: React.ReactNode;
    loadingArea?: string | undefined;
}) => {
    const { promiseInProgress } = usePromiseTracker({ area: loadingArea });
    return <>{promiseInProgress ? contentLoader : children}</>;
};
