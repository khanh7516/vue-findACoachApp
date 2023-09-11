import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./components/pages/coaches/CoachDetail.vue";
import CoachesList from "./components/pages/coaches/CoachesList.vue";
import CoachRegistration from "./components/pages/coaches/CoachRegistration.vue";
import ContactCoach from "./components/pages/requests/ContactCoach.vue";
import RequestReceived from "./components/pages/requests/RequestsReceived.vue";
import UserAuth from "./components/pages/auth/UserAuth.vue";
import NotFound from "./components/pages/NotFound.vue";
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: "/register", component: CoachRegistration, meta: {requiresAuth: true} },
    { path: "/requests", component: RequestReceived, meta: {requiresAuth: true} },
    { path: "/auth", component: UserAuth, meta: {requiresUnauth: true} },
    { path: "/:notFound(.*)", component: NotFound }, //exception
  ],
});


router.beforeEach(function(to, from, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    }else next();
});


export default router;
