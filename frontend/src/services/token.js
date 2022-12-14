class TokenService {
    setTokens(tokens) {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
    }

    removeTokens() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }

    getLocalRefreshToken() {
        return localStorage.getItem('refresh');
    }

    getLocalAccessToken() {
        return localStorage.getItem('access');
    }

    updateLocalAccessToken(token) {
        localStorage.setItem('access', token);
    }
}

export default new TokenService();
