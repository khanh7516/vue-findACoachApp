import { createStore } from "vuex";
import coachesModules from "./modules/coaches/index.js";
import requestsModules from "./modules/requests/index.js";

const store = createStore({
  modules: {
    coaches: coachesModules,
    requests: requestsModules,
  },
  state() {
    return {
      userID: "c3",
    };
  },
  getters: {
    userID(state) {
      return state.userID;
    },
  },
});

export default store;
