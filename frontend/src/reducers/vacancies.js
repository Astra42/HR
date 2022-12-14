import { types } from '../actions/types';

const initialState = {
    vacancies: [],
};

export function vacanciesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.vacancies.LOAD_AVAILABLE_VACANCIES_SUCCES:
            return {
                ...state,
                vacancies: payload.results,
            };
        case types.vacancies.LOAD_AVAILABLE_VACANCIES_FAIL:
            return {
                ...state,
                vacancies: [],
            };
        default:
            return state;
    }
}
