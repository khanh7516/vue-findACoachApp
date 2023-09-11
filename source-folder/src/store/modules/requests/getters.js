export default {
    requests(state, _, _2, rootGetters) {
        const coachId = rootGetters.userID;

        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};