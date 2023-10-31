import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/store';
import { ActiveMenuProvider, ThemeProvider } from './utils';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider>
        <Provider store={store}>
            <ActiveMenuProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ActiveMenuProvider>
        </Provider>
    </ThemeProvider>
);
