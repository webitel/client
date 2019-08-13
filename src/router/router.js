import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import login from '../components/auth/the-login';
import register from '../components/auth/the-register';

import moduleWrap from '../components/objects/module-wrap';
import home from '../components/objects/home/the-home';
import notFound from '../components/utils/the-not-found-component';
import permissions from '../components/objects/permissions/the-permissions';
import permissionsNew from '../components/objects/permissions/permissions-new';
import permissionsObject from '../components/objects/permissions/permissions-object/the-permissions-object';
import permissionsObjectEdit from '../components/objects/permissions/permissions-object/permissions-object-edit';
import devices from '../components/objects/devices/the-devices';
import devicesNew from '../components/objects/devices/devices-new';
import users from '../components/objects/users/the-users';
import usersNew from '../components/objects/users/users-new';

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
                },
                {
                    path:'/devices/new',
                    name: 'devices-new',
                    component: devicesNew
                },
                {
                    path: '/users',
                    name: 'users',
                    component: users
                },
                {
                    path:'/users/new',
                    name: 'users-new',
                    component: usersNew
                },
            ]
        },
        {
            path: '*',
            name: 'not-found',
            component: notFound
        }
    ],
});

// router.beforeEach((to, from, next) => {
//     if(!(to.fullPath === '/login' || to.fullPath === '/register')) {
//         if (!localStorage.getItem('access-token')) {
//             console.log('if');
//             next('/login');
//         }
//     }
//     next();
// });


export default router;