import axios from 'axios';

import { types } from './types';

export const createNewResume = data => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json',
        },
    };

    const body = JSON.stringify({ ...data });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/resumes/`, body, config)
    } catch (error) {}
};

export const loadAvailableResumes = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json',
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/resumes/`, config);

        dispatch({
            type: types.resumes.LOAD_AVAILABLE_RESUMES_SUCCES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: types.resumes.LOAD_AVAILABLE_RESUMES_FAIL,
        });
    }
};
