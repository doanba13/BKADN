import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';

import LoadingComponent from '@/component/LoadingComponent';

const HelloPage = React.lazy(/* webpackChunkName: "hello-component" */ () => import('@/pages/HelloPage'));
const NotFoundPage = React.lazy(/* webpackChunkName: "not-found-page" */ () => import('@/pages/NotFoundPage'));
const ChartPage = React.lazy(/* webpackChunkName: "ChartPage" */ () => import('./ChartPage'));
const DetailInfo = React.lazy(/* webpackChunkName: "DetailInfo" */ () => import('./DetailInformation'));
const RowChartPage = React.lazy(/* webpackChunkName: "RowChartPage" */ () => import('./RowChartPage'));
const SettingPage = React.lazy(/* webpackChunkName: "SettingPage" */ () => import('./SettingPage'));
const ErrorFallBack = React.lazy(/* webpackChunkName: "login-page" */ () => import('@/pages/ErrorFallbackPage'));

const ApplicationRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<LoadingComponent />}>
            <ErrorBoundary FallbackComponent={ErrorFallBack} key={location.pathname}>
                <Routes>
                    <Route path={'/'} element={<DetailInfo />} />
                    <Route path={'/detail'} element={<HelloPage />} />
                    <Route path={'/chart-1'} element={<ChartPage />} />
                    <Route path={'/chart-2'} element={<RowChartPage />} />
                    <Route path={'/chart-3'} element={<SettingPage />} />
                    <Route element={<NotFoundPage />} />
                </Routes>
            </ErrorBoundary>
        </Suspense>
    );
};

export default ApplicationRoutes;
