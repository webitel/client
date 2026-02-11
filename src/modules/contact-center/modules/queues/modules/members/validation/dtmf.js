import { helpers } from '@vuelidate/validators';

export const digitsDtmfOnly = (v) => !helpers.req(v) || /^[\d|w|W]*$/g.test(v);
