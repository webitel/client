import { config } from '@vue/test-utils';
import en from '../../src/app/locale/en/en';

config.global.mocks.$t = (msg) => en[msg] || msg;
config.global.mocks.$tc = (msg) => en[msg] || msg;
