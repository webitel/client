import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import login from '../components/auth/the-login';
import register from '../components/auth/the-register';

import moduleWrap from '../components/modules/module-wrap';
import home from '../components/modules/home/the-home';
import notFound from '../components/the-not-found-component';
import permissions from '../components/modules/permissions/the-permissions';
import permissionsNew from '../components/modules/permissions/permissions-new';
import permissionsObject from '../components/modules/permissions/permissions-object';
import permissionsObjectEdit from '../components/modules/permissions/permissions-object-edit';
import devices from '../components/modules/devices/the-devices';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/',
            component: moduleWrap,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: home
                },
                {
                    path: '/permissions',
                    name: 'permissions',
                    component: permissions,
                },
                {
                    path: '/permissions/new',
                    name: 'permissions-new',
                    component: permissionsNew
                },
                {
                    path: '/permissions/object',
                    name: 'permissions-object',
                    component: permissionsObject
                },
                {
                    path: '/permissions/object/edit',
                    name: 'permissions-object-edit',
                    component: permissionsObjectEdit
                },
                {
                    path:'/devices',
                    name: 'devices',
                    component: devices
                }
            ]
        },
        {
            path: '*',
            name: 'not-found',
            component: notFound
        }
    ],
});

router.beforeEach((to, from, next) => {
    if(!(to.fullPath === '/login' || to.fullPath === '/register')) {
        if (!localStorage.getItem('access-token')) {
            console.log('if');
            next('/login');
        }
    }
    next();
});


export default router;