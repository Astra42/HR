import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth';
import { vacanciesReducer } from './reducers/vacancies';
import { resumesReducer } from './reducers/resumes';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacancies: vacanciesReducer,
        resumes: resumesReducer,
    },
});
