import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theRoles from '../../src/components/objects/permissions/roles/the-roles';
import newRole from '../../src/components/objects/permissions/roles/roles-new';
import {getRoles} from "../../src/api/objects/permissions/roles";
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('roles-new.vue', () => {
    const wrapper = shallowMount(newRole, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new role', async (done) => {
        const initialRoles = await getRoles();
        wrapper.setData({
            roleInstance: {
                role: 'jest-role',
                name: 'Jest role',
            },
        });
        // wrapper.find('.object-header .primary-btn').trigger('click');
        await wrapper.vm.save();
        const newRoles = await getRoles();
        expect(newRoles.length).toBe(initialRoles.length + 1);
        done();
    });

    it('updates existing role', async (done) => {
        const roleList = await getRoles();
        const createdRole = roleList.find(role => {
            return role.role === 'jest-role'
        });
        wrapper.setData({id: createdRole.id});
        await wrapper.vm.loadRole();
        const newRoleInstance = {
            roleInstance: {
                role: 'updated-jest-role',
            }
        };
        wrapper.setData(newRoleInstance);

        expect(wrapper.vm.initialRole).not.toEqual(wrapper.vm.roleInstance);
        expect(wrapper.vm.initialRole).toEqual(createdRole);
        await wrapper.vm.save();

        const newRoleList = await getRoles();
        const newRole = newRoleList.find(role => {
            return role.role === 'updated-jest-role'
        });

        expect(newRole.role).toEqual(newRoleInstance.roleInstance.role);
        done();
    });
});

describe('the-roles.vue', () => {
    const wrapper = mount(theRoles, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let createdRole;
    let createdRoleIndex;
    // initially load all roles
    beforeAll(async () => {
        await wrapper.vm.loadRoleList();

        // find tested role
        createdRole = wrapper.vm.roleList.find(role => {
            return role.role === 'updated-jest-role'
        });

        // and its index
        createdRoleIndex = wrapper.vm.roleList.indexOf(createdRole);
    });


    it('fills roleList with data', async (done) => {
        expect(wrapper.vm.roleList.length).toBeGreaterThan(0);
        done();
    });

    it('draws table with roleList', () => {
        expect(wrapper.findAll('tr').length).toEqual(wrapper.vm.roleList.length + 1);
    });

    it('removes role from list', async (done) => {
        // test if there's initially a role
        expect(typeof createdRole).toBe('object');

        await wrapper.vm.remove(createdRoleIndex);

        // remove role and check if it removed from list
        expect(wrapper.vm.roleList).not.toContain(createdRole);

        // check if it removed from database
        expect(await getRoles()).not.toContain(createdRole);
        done();
    });
});
