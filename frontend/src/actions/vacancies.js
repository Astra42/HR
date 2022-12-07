import axios from 'axios';

import { types } from './types';

export const setCurrentVacancy = data => async dispatch => {
    dispatch({
        type: types.vacancies.SET_CURRENT_VACANCY,
        payload: data,
    });
};

export const loadAvailableVacancies = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/vacancies/`, config);

        dispatch({
            type: types.vacancies.LOAD_AVAILABLE_VACANCIES_SUCCES,
            payload: res.data,
        });

    } catch (error) {
        dispatch({
            type: types.vacancies.LOAD_AVAILABLE_VACANCIES_FAIL,
        });
    }
};

export const createNewVacancy = data => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json',
        },
    };

    const body = JSON.stringify({ ...data });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/vacancies/`, body, config);

        dispatch({
            type: types.vacancies.CREATE_NEW_VACANCY_SUCCES,
        });

    } catch (error) {
        dispatch({
            type: types.vacancies.CREATE_NEW_VACANCY_FAIL,
        });
    }
};

export async function loadVacancyBySlug(data)  {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json',
        },
    };

    try {
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/vacancies/${data.slug}`, config);

        return res.data;

    } catch (error) {
        return null;
    }
};
