import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/auth/the-login';
import register from '../components/auth/the-register';
import home from '../components/modules/home/the-home';
import notFound from '../components/the-not-found-component';
import permissions from '../components/modules/permissions/the-permissions';
import permissionsNew from '../components/modules/permissions/permissions-new';

Vue.use(Router);

export default new Router({
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
      name: 'home',
      component: home
    },
    {
      path: '/permissions',
      name: 'permissions',
      component: permissions,
      children: []
    },
    {
      path: '/permissions/new',
      name: 'permissions-new',
      component: permissionsNew
    },
    {
      path: '*',
      name: 'not-found',
      component: notFound
    }
  ],
});
