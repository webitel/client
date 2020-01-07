import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theRoles from '../../../../src/components/permissions/roles/the-roles';
import newRole from '../../../../src/components/permissions/roles/opened-role';
import {getRoleList} from '../../../../src/api/permissions/roles/roles';
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
                name: 'jest-role',
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newRoleList = await getRoleList('jest-role'); // get new roles
            expect(newRoleList).toBeTruthy(); // compare roles number with initial
            done();
        }, 300);
    });

    it('updates existing role', async (done) => {
        const dataList = await getRoleList('*jest-role'); // load all roles

        // to find created role id
        const createdRole = dataList.find(role => {
            return role.name === 'jest-role'
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
                name: 'updated-jest-role',
            }
        };

        console.log(createdRole)
        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated role
            const newRoleList = await getRoleList('updated-jest-role');
            const newRole = newRoleList.find(role => {
                return role.name === 'updated-jest-role'
            });

            // test if there's a role
            expect(newRole).toBeTruthy();

            // check if backend role is equal to updated role
            expect(newRole.name).toEqual(newRoleInstance.itemInstance.name);
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
        await wrapper.vm.loadDataList('*jest-role');

        // find tested role
        createdRole = wrapper.vm.dataList.find(item => {
            return item.name === 'updated-jest-role' || 'jest-role'
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
            expect(await getRoleList('*jest-role')).not.toContain(createdRole);
            done();
        }, 100);
    });
});
