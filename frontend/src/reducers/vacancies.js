import { types } from '../actions/types';

const initialState = {
    list: [],
};

export function vacanciesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.vacancies.SET_CURRENT_VACANCY:
            return {
                ...state,
                current: payload.current,
            };
        case types.vacancies.LOAD_AVAILABLE_VACANCIES_SUCCES:
            return {
                ...state,
                list: payload.results,
            };
        case types.vacancies.LOAD_AVAILABLE_VACANCIES_FAIL:
            return {
                ...state,
                list: [],
            };
        case types.vacancies.CREATE_NEW_VACANCY_SUCCES:
        case types.vacancies.CREATE_NEW_VACANCY_FAIL:
        default:
            return state;
    }
}
