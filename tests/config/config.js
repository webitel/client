import { config } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import en from '../../src/app/locale/en/en';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'vi' }],
});

config.global.mocks.$t = (msg) => en[msg] || msg;
config.global.mocks.$tc = (msg) => en[msg] || msg;
config.global.plugins.push(router);
