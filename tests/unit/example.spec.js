import { shallowMount, createLocalVue } from '@vue/test-utils'
// import theNav from '../../src/components/objects/administration/license/the-customers';
import theNav from '../../src/components/auth/the-login';
import i18n from 'vue-i18n';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
const $t = () => {};
// const $v = () => {};
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();


describe('the-login.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(theNav, {
      mocks:{$t},
      localVue,
      router,
      i18n
    });
    expect(wrapper.text()).toMatch(msg);
  })
});
