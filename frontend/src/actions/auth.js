import { types } from './types';
import AuthService from '../services/auth';
import TokenService from '../services/token';

export const login = data => dispatch => {
    return AuthService.login(data).then(
        data => {
            dispatch({ type: types.auth.LOGIN_SUCCCES, payload: data });

            dispatch(loadUser());

            return Promise.resolve();
        },
        error => {
            dispatch({ type: types.auth.LOGIN_FAIL });

            return error.response;
        }
    );
};

export const signup = data => dispatch => {
    return AuthService.signup(data).then(
        data => {
            dispatch({ type: types.auth.SIGNUP_SUCCCES, payload: data });

            return Promise.resolve();
        },
        error => {
            dispatch({ type: types.auth.SIGNUP_FAIL });

            return error.response;
        }
    );
};

export const loadUser = () => dispatch => {
    if (TokenService.getLocalAccessToken()) {
        return AuthService.loadUser().then(
            data => {
                dispatch({ type: types.auth.USER_LOADED_SUCCES, payload: data });

                return Promise.resolve();
            },
            error => {
                // const message =
                //     (error.response && error.response.data && error.response.data.message) ||
                //     error.message ||
                //     error.toString();

                dispatch({ type: types.auth.USER_LOADED_FAIL });

                return Promise.reject();
            }
        );
    }
};

export const checkAuthenticated = () => dispatch => {
    if (TokenService.getLocalAccessToken()) {
        return AuthService.checkAuthenticated().then(
            data => {
                dispatch({ type: types.auth.AUTHENTICATED_SUCCES });

                dispatch(loadUser());

                return Promise.resolve();
            },
            error => {
                // const message =
                //     (error.response && error.response.data && error.response.data.message) ||
                //     error.message ||
                //     error.toString();

                dispatch({ type: types.auth.AUTHENTICATED_FAIL });

                return Promise.reject();
            }
        );
    }
};

export const logout = () => dispatch => {
    if (TokenService.getLocalRefreshToken()) {
        return AuthService.logout().then(
            data => {
                dispatch({ type: types.auth.LOGOUT });

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
    }
};

export const updateProfile = (data, username) => dispatch => {
    if (TokenService.getLocalAccessToken()) {
        return AuthService.updateProfile(data, username).then(
            data => {
                dispatch(loadUser());

                return Promise.resolve();
            },
            error => {
                // const message =
                //     (error.response && error.response.data && error.response.data.message) ||
                //     error.message ||
                //     error.toString();

                console.log(error.response)

                return error.response;
            }
        );
    }
};

export const loadCountries = () => {
    if (TokenService.getLocalAccessToken()) {
        return AuthService.loadCountries().then(
            data => {
                return data;
            },
            error => {
                // const message =
                //     (error.response && error.response.data && error.response.data.message) ||
                //     error.message ||
                //     error.toString();

                return error.response;
            }
        );
    }
};

export const loadResume = () => {
    if (TokenService.getLocalAccessToken()) {
        return AuthService.loadResume().then(
            data => {
                return data;
            },
            error => {
                // const message =
                //     (error.response && error.response.data && error.response.data.message) ||
                //     error.message ||
                //     error.toString();
                console.log(error.response);

                return error.response;
            }
        );
    }
};

export const resetPassword = data => {
    return AuthService.resetPassword(data).then(
        data => {
            console.log(data);
            return data;
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return error.response;
        }
    );
};
