export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userID = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
        state.didAutoLogout = false;
    },
    didAutoLogout(state) {
        state.didAutoLogout = true;
    }
};