import { types } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    profile: null,
};

export function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.auth.LOGIN_SUCCCES:
        case types.auth.AUTHENTICATED_SUCCES:
            return {
                ...state,
                isAuthenticated: true,
            };
        case types.auth.USER_LOADED_SUCCES:
            return {
                ...state,
                profile: payload,
            };
        case types.auth.LOGOUT:
        case types.auth.SIGNUP_FAIL:
        case types.auth.LOGIN_FAIL:
        case types.auth.USER_LOADED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                profile: null,
            };
        case types.auth.SIGNUP_SUCCCES:
        case types.auth.AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            };
        case types.auth.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
}
