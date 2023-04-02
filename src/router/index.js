import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Avaliações',
                    component: () => import('@/views/pages/Evaluation.vue')
                },
                {
                    path: '/CRUD',
                    name: 'CRUD',
                    params: true,
                    component: () => import('@/views/pages/evaluation/CRUDevaluation.vue')
                },
                {
                    path: '/atividade',
                    name: 'atividade',
                    component: () => import('@/views/pages/Annelise.vue')
                }
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
