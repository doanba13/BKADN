import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { color } from '@/assets/color';
import { ScrollToTop } from '@/util/ScrollToTop';

import App from './App';

import './index.css';

if (module && module.hot) module.hot.accept();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={color}>
                <App />
                <ScrollToTop />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
