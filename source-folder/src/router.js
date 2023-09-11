import {createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './components/pages/coaches/CoachDetail.vue';
import CoachesList from './components/pages/coaches/CoachesList.vue';
import CoachRegistration from './components/pages/coaches/CoachRegistration.vue';
import ContactCoach from './components/pages/requests/ContactCoach.vue';
import RequestReceived from './components/pages/requests/RequestsReceived.vue';
import NotFound from './components/pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory() ,
    routes: [
        {path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList},
        { path: '/coaches/:id', 
        component: CoachDetail, 
        props: true,
        children: [
            {path: 'contact', component: ContactCoach},  // /coaches/c1/contact
            
        ]},
        { path: '/register', component: CoachRegistration},
        { path: '/requests', component: RequestReceived},       
        { path: '/:notFound(.*)', component: NotFound},   //exception    
    ],

});


export default router;