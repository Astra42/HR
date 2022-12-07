import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth';
import { vacanciesReducer } from './reducers/vacancies';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacancies: vacanciesReducer,
    },
});
