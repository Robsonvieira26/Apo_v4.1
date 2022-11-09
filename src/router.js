import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('./views/evaluation.vue'),
                
            },
            {
                path:"/CRUD",
                name:"CRUD",
                component:() => import('./views/CRUDevaluation.vue')
            },
           
        ]
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
