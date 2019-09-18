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
    const wrapper = mount(newRole, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new role', async (done) => {
        const roleList = await getRoles(); // get initial roles

        // set new role data
        wrapper.setData({
            roleInstance: {
                role: 'jest-role',
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newRoleList = await getRoles(); // get new roles
            expect(newRoleList.length).toBe(roleList.length + 1); // compare roles number with initial
            done();
        }, 100);
    });

    it('updates existing role', async (done) => {
        const roleList = await getRoles(); // load all roles
        // to find created role id
        const createdRole = roleList.find(role => {
            return role.role === 'jest-role'
        });

        // emulate route path by setting id
        wrapper.setData({id: createdRole.id});

        // load role by its id
        await wrapper.vm.loadRole();

        // check if initial role was set correctly
        expect(wrapper.vm.initialRole).toEqual(createdRole);

        // set updated role data
        const newRoleInstance = {
            roleInstance: {
                role: 'updated-jest-role',
            }
        };
        wrapper.setData(newRoleInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated role
            const newRoleList = await getRoles();
            const newRole = newRoleList.find(role => {
                return role.role === 'updated-jest-role'
            });

            // test if there's a role
            expect(typeof newRole).toBe('object');

            // check if backend role is equal to updated role
            expect(newRole.role).toEqual(newRoleInstance.roleInstance.role);
            done();
        }, 100);
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

        // find all delete icons and choose tested role by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(createdRoleIndex).trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove role and check if it removed from list
            expect(wrapper.vm.roleList).not.toContain(createdRole);

            // check if it removed from database
            expect(await getRoles()).not.toContain(createdRole);
            done();
        }, 100);
    });
});
