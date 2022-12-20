import { types } from '../actions/types';

const initialState = {
    vacancies: [],
    departmentVacancies: [],
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
        case types.vacancies.LOAD_AVAILABLE_DEPARTMENT_VACANCIES_SUCCES:
            return {
                ...state,
                departmentVacancies: payload.results,
            };
        case types.vacancies.LOAD_AVAILABLE_DEPARTMENT_VACANCIES_FAIL:
            return {
                ...state,
                departmentVacancies: [],
            };
        default:
            return state;
    }
}
