import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      userID: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false
    };
  },
  mutations,
  getters,
  actions,
};
