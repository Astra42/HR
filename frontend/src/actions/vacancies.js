import { types } from './types';
import VacanciesService from '../services/vacancies';

export const loadAvailableVacancies = () => dispatch => {
    return VacanciesService.loadAvailableVacancies().then(
        data => {
            dispatch({ type: types.vacancies.LOAD_AVAILABLE_VACANCIES_SUCCES, payload: data });

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
    );
};

export const loadDepartamentVacancies = () => dispatch => {
    return VacanciesService.loadDepartamentVacancies().then(
        data => {
            dispatch({ type: types.vacancies.LOAD_AVAILABLE_DEPARTMENT_VACANCIES_SUCCES, payload: data });

            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            dispatch({ type: types.vacancies.LOAD_AVAILABLE_DEPARTMENT_VACANCIES_FAIL });

            return Promise.reject();
        }
    );
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
    );
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
    );
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
    );
};

export const updateVacancy = (slug, data) => {
    return VacanciesService.updateVacancy(slug, data).then(
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
    );
};

export const loadReplies = slug => {
    return VacanciesService.loadReplies(slug).then(
        data => {
            console.log(data);

            return data.resumes;
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return Promise.reject();
        }
    );
};

export const editVacancy = (slug, data) => {
    return VacanciesService.editVacancy(slug, data).then(
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
    );
};

export const deleteVacancy = slug => {
    return VacanciesService.deleteVacancy(slug).then(
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
    );
};

export const searchVacancies = keywords => dispatch => {
    return VacanciesService.searchVacancies(keywords).then(
        data => {
            dispatch({ type: types.vacancies.SEARCH_AVAILABLE_VACANCIES_SUCCES, payload: data });

            return Promise.resolve();
        },
        error => {
            dispatch({ type: types.vacancies.SEARCH_AVAILABLE_VACANCIES_FAIL})

            return Promise.reject();
        }
    );
};
