import { types } from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: true,
    profile: null,
};

export function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOADED_SUCCES:
            return {
                ...state,
                profile: payload,
            }
        case types.auth.SIGNUP_SUCCCES:
            return {
                ...state,
                isAuthenticated: false,
            };
        case types.auth.LOGIN_SUCCCES:
            localStorage.setItem('access', payload.tokens.access);
            return {
                ...state,
                access: payload.tokens.access,
                refresh: payload.tokens.refresh,
                isAuthenticated: true,
            };
        case types.auth.AUTHENTICATED_SUCCES:
            return {
                ...state,
                isAuthenticated: true,
            };
        case types.auth.USER_LOADED_SUCCES:
            console.log(payload);
            return {
                ...state,
                profile: payload,
            };
        case types.auth.LOGOUT:
        case types.auth.SIGNUP_FAIL:
        case types.auth.LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                profile: null,
            };
        case types.auth.AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            };
        case types.auth.USER_LOADED_FAIL:
            return {
                ...state,
                profile: null,
            };
        default:
            return state;
    }
}
