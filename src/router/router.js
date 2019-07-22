import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login/the-login';
import register from '../components/login/the-register';
import home from '../components/the-home';
import notFound from '../components/the-not-found-component';

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
      component: register,
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '*',
      name: 'not-found',
      component: notFound
    }
  ],
});
