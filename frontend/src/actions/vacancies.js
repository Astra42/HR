import { types } from './types';
import VacanciesService from '../services/vacancies'

export const loadAvailableVacancies = () => dispatch => {
    return VacanciesService.loadAvailableVacancies().then(
        data => {
            dispatch({type: types.vacancies.LOAD_AVAILABLE_VACANCIES_SUCCES, payload: data});

            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            dispatch({ type: types.vacancies.LOAD_AVAILABLE_VACANCIES_FAIL });

            return Promise.reject();
        }
    )
};

export const loadVacancyBySlug = data => {
    return VacanciesService.loadVacancyBySlug(data).then(
        data => {
            return data;
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return Promise.reject();
        }
    )
};

export const createNewVacancy = data => {
    return VacanciesService.createNewVacancy(data).then(
        data => {
            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return Promise.reject();
        }
    )
};

export const replyOnVacancy = data => {
    return VacanciesService.replyOnVacancy(data).then(
        data => {
            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return Promise.reject();
        }
    )
};
