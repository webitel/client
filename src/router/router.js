import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import login from '../components/auth/the-login';
import register from '../components/auth/the-register';

import moduleWrap from '@/components/objects/module-wrap';
import home from '@/components/objects/home/the-home';
import notFound from '@/components/utils/the-not-found-component';
import permissionsRoles from '@/components/objects/permissions/roles/the-roles';
import permissionsRolesNew from '@/components/objects/permissions/roles/roles-new';
import permissionsObjects from '@/components/objects/permissions/objects/the-objects';
import permissionsObjectsEdit from '@/components/objects/permissions/objects/objects-edit';
import devices from '@/components/objects/directory/devices/the-devices';
import devicesNew from '@/components/objects/directory/devices/devices-new';
import users from '@/components/objects/directory/users/the-users';
import usersNew from '@/components/objects/directory/users/users-new';
import customers from '@/components/objects/administration/license/the-customers';
import agentSkills from '@/components/objects/lookups/agent-skills/the-agent-skills';
import agentSkillsEdit from '@/components/objects/lookups/agent-skills/agent-skills-edit';
import leadStatus from '@/components/objects/lookups/lead-status/the-lead-status';
import leadStatusEdit from '@/components/objects/lookups/lead-status/lead-status-edit';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
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

                // ----------DIRECTORY------------
                {
                    path:'directory/devices',
                    name: 'directory-devices',
                    component: devices
                },
                {
                    path:'/directory/devices/new',
                    name: 'directory-devices-new',
                    component: devicesNew
                },
                {
                    path: '/directory/users',
                    name: 'directory-users',
                    component: users
                },
                {
                    path:'/directory/users/new',
                    name: 'directory-users-new',
                    component: usersNew
                },
                // ----------DIRECTORY END------------

                // ----------LOOKUPS------------
                {
                    path:'/lookups/skills',
                    name: 'skills-lookup',
                    component: agentSkills
                },
                {
                    path:'/lookups/skills/new',
                    name: 'skills-lookup-new',
                    component: agentSkillsEdit
                },
                {
                    path:'/lookups/skills/:id',
                    name: 'skills-lookup-edit',
                    component: agentSkillsEdit
                },

                {
                    path:'/lookups/lead-status',
                    name: 'lead-status-lookup',
                    component: leadStatus
                },
                {
                    path:'/lookups/lead-status/new',
                    name: 'lead-status-lookup-new',
                    component: leadStatusEdit
                },
                {
                    path:'/lookups/lead-status/:id',
                    name: 'lead-status-lookup-edit',
                    component: leadStatusEdit
                },
                // ----------LOOKUPS END------------

                // --------------ADMINISTRATION-------------
                {
                    path:'/administration/license',
                    name: 'administration-customers',
                    component: customers
                },
                // --------------ADMINISTRATION END-------------

                // ----------PERMISSIONS-----------------
                {
                    path: '/permissions/roles',
                    name: 'permissions-roles',
                    component: permissionsRoles,
                },
                {
                    path: '/permissions/roles/:id',
                    name: 'permissions-roles-edit',
                    component: permissionsRolesNew
                },
                {
                    path: '/permissions/roles/new',
                    name: 'permissions-roles-new',
                    component: permissionsRolesNew
                },
                {
                    path: '/permissions/objects',
                    name: 'permissions-objects',
                    component: permissionsObjects
                },
                {
                    path: '/permissions/objects/:id',
                    name: 'permissions-objects-edit',
                    component: permissionsObjectsEdit,
                },
                // ----------PERMISSIONS END-----------------
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