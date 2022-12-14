import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { setupInterceptors } from './services/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/*' element={<App />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

setupInterceptors(store.dispatch)

window.store = store;

reportWebVitals();
