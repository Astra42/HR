import axios from 'axios';

import { types } from './types';

export const login = data => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ ...data });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login/`, body, config);

        dispatch({
            type: types.auth.LOGIN_SUCCCES,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: types.auth.LOGIN_FAIL,
        });
    }
};

export const signup = data => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    const body = JSON.stringify({ ...data });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register/`, body, config);
        
        dispatch({
            type: types.auth.SIGNUP_SUCCCES,
            payload: res.data,
        });

    } catch (error) {
        dispatch({
            type: types.auth.SIGNUP_FAIL,
        });
    }
};

export const loadUser = () => async dispatch => {    
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`,
                Accept: 'application/json',
            },
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/my_profile`, config);

            dispatch({
                type: types.auth.USER_LOADED_SUCCES,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: types.auth.USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: types.auth.USER_LOADED_FAIL,
        });
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/verify/`, body, config);

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: types.auth.AUTHENTICATED_SUCCES,
                });

                dispatch(loadUser());
            } else {
                dispatch({
                    type: types.auth.AUTHENTICATED_FAIL,
                });
            }
        } catch (error) {
            dispatch({
                type: types.auth.AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: types.auth.AUTHENTICATED_FAIL,
        });
    }
};

export const logout = () => async dispatch => {
    dispatch({
        type: types.auth.LOGOUT,
    });
};
