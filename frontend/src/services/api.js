import axios from 'axios';

import { types } from '../actions/types';
import TokenService from './token';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function setupInterceptors(dispatch) {
    api.interceptors.request.use(
        config => {
            const token = TokenService.getLocalAccessToken();

            if (token) {
                config.headers['Authorization'] = `JWT ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            const originalConfig  = error.config;

            const token = TokenService.getLocalRefreshToken();
            
            if (originalConfig .url !== '/user/login/' && error.response) {
                if (error.response.status === 401 && !originalConfig._retry && token) {
                    originalConfig._retry = true;

                    try {
                        const response = await api.post('/user/login/refresh/', {refresh: token});

                        const access = response.data.access;

                        dispatch({type: types.auth.REFRESH_TOKEN_SUCCESS, payload: access});
                        TokenService.updateLocalAccessToken(access);
                        
                        return api({
                            ...originalConfig,
                            headers: {...originalConfig.headers, Authorization: `JWT ${access}`},
                            sent: true
                        });
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(error);
        }
    );
}
