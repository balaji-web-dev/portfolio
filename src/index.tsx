import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ActiveMenuProvider, ThemeProvider } from './utils';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider>
        <ActiveMenuProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ActiveMenuProvider>
    </ThemeProvider>
);
