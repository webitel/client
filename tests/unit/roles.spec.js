import {shallowMount, createLocalVue} from '@vue/test-utils'
import theRoles from '../../src/components/objects/permissions/roles/the-roles';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';

const $t = () => {};
const $tc = () => {};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();


describe('the-roles.vue', () => {
    const wrapper = shallowMount(theRoles, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('fills roleList with data', async (done) => {
        await wrapper.vm.loadRoleList();
        expect(wrapper.vm.roleList.length).toBeGreaterThan(0);
        done();
    });

    it('draws table with roleList', {

    });
});
