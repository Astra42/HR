import { api } from "./api";
import TokenService from './token'

class AuthService {
    login(data) {
        const body = JSON.stringify({ ...data });

        return api
            .post(
                '/user/login/', body
            ).then(
                response => {
                    if (response.data?.tokens?.access) {
                        TokenService.setTokens(response.data.tokens);
                    }

                    return response.data;
                }
            )
    }

    signup(data) {
        const body = JSON.stringify({ ...data });

        return api
            .post(
                '/user/register/', body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    loadUser() {
        return api
            .get(
                '/user/my_profile/'
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    checkAuthenticated() {
        const body = JSON.stringify({ token: TokenService.getLocalAccessToken() });

        return api
            .post(
                '/user/verify/', body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    logout() {
        const body = JSON.stringify({ refresh: TokenService.getLocalRefreshToken() });

        return api
            .post(
                '/user/logout/', body
            ).then(
                response => {
                    TokenService.removeTokens();

                    return response.data;
                }
            )
    }

    updateProfile(data, username) {
        const body = JSON.stringify({...data});

        console.log(data)

        return api
            .patch(
                `/user/update_profile/${username}/`, body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    loadCountries() {
        return api
            .get(
                '/user/counties/'
            ).then(
                response => {
                    return response.data;
                }
            )
    }
}

export default new AuthService();