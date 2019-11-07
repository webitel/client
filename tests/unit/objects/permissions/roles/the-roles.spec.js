import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theRoles from '../../../../../src/components/objects/permissions/roles/the-roles';
import newRole from '../../../../../src/components/objects/permissions/roles/opened-role';
import {getRoleList} from '../../../../../src/api/objects/permissions/roles';
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
        const roleList = await getRoleList(); // get initial roles

        // set new role data
        wrapper.setData({
            itemInstance: {
                role: 'jest-role',
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newRoleList = await getRoleList(); // get new roles
            expect(newRoleList).toHaveLength(roleList.length + 1); // compare roles number with initial
            done();
        }, 300);
    });

    it('updates existing role', async (done) => {
        const dataList = await getRoleList(); // load all roles
        // to find created role id
        const createdRole = dataList.find(role => {
            return role.role === 'jest-role'
        });

        // emulate route path by setting id
        wrapper.setData({id: createdRole.id});

        // load role by its id
        await wrapper.vm.loadItem();

        // check if initial role was set correctly
        expect(wrapper.vm.initialItem.id).toEqual(createdRole.id);

        // set updated role data
        const newRoleInstance = {
            itemInstance: {
                role: 'updated-jest-role',
            }
        };
        wrapper.setData(newRoleInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated role
            const newRoleList = await getRoleList();
            const newRole = newRoleList.find(role => {
                return role.role === 'updated-jest-role' || role.role === 'jest-role'
            });

            // test if there's a role
            expect(newRole).toBeTruthy();

            // check if backend role is equal to updated role
            expect(newRole.role).toEqual(newRoleInstance.itemInstance.role);
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
        await wrapper.vm.loadDataList();

        // find tested role
        createdRole = wrapper.vm.dataList.find(role => {
            return role.role === 'updated-jest-role'
        });

        // and its index
        createdRoleIndex = wrapper.vm.dataList.indexOf(createdRole);
    });


    it('fills roleList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with roleList', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('removes role from list', async (done) => {
        // test if there's initially a role
        expect(createdRole).toBeTruthy();

        // find all delete icons and choose tested role by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(createdRoleIndex)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove role and check if it removed from list
            expect(wrapper.vm.dataList).not.toContain(createdRole);

            // check if it removed from database
            expect(await getRoleList()).not.toContain(createdRole);
            done();
        }, 100);
    });
});
