import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theObjects from '../../../../../src/components/objects/permissions/objects/the-objects';
import editObject from '../../../../../src/components/objects/permissions/objects/objects-edit';
import {getObjects} from '../../../../../src/api/objects/permissions/objects';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';

const $t = () => {};
const $tc = () => {};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('the-objects.vue', () => {
    const wrapper = mount(theObjects, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let testedObject;
    let testedObjectIndex;
    // initially load all objects
    beforeAll(async () => {
        await wrapper.vm.loadObjectList();

        // find tested object
        testedObject = wrapper.vm.objectList.find(object => {
            return object.class === 'users'
        });

        // and its index
        testedObjectIndex = wrapper.vm.objectList.indexOf(testedObject);
    });


    it('fills objectList with data', async (done) => {
        expect(wrapper.vm.objectList.length).toBeGreaterThan(0);
        done();
    });

    it('draws table with roleList', () => {
        expect(wrapper.findAll('tr').length).toEqual(wrapper.vm.objectList.length + 1);
    });

    it('toggles object ObAC', async (done) => {
        // copy initial ObAC value and prevent it from reactive changing
        const initialObACState = !!testedObject.obac;

        // find all obac switchers and click on tested object's switcher
        wrapper.findAll('.object-switcher.obac').at(testedObjectIndex)
            .vm.$emit('toggleSwitch');

        // wait for async response
        await setTimeout(async () => {
            // check if local data have changed
            expect(wrapper.vm.objectList[testedObjectIndex].obac).toBe(!initialObACState);

            // check if db data have changed
            const newObjectList = await getObjects();
            const newTestedObject = newObjectList.find(object => {
                return object.class === 'users'
            });
            expect(newTestedObject.obac).toBe(!initialObACState);
            done();
        }, 100);
    });

    it('toggles object RbAC', async (done) => {
        // copy initial RbAC value and prevent it from reactive changing
        const initialRbACState = !!testedObject.rbac;

        // find all rbac switchers and click on tested object's switcher
        wrapper.findAll('.object-switcher.rbac').at(testedObjectIndex)
            .vm.$emit('toggleSwitch');

        // wait for async response
        await setTimeout(async () => {
            // check if local data have changed
            expect(wrapper.vm.objectList[testedObjectIndex].rbac).toBe(!initialRbACState);

            // check if db data have changed
            const newObjectList = await getObjects();
            const newTestedObject = newObjectList.find(object => {
                return object.class === 'users'
            });
            expect(newTestedObject.rbac).toBe(!initialRbACState);
            done();
        }, 100);
    });
});

// describe('roles-new.vue', () => {
//     const wrapper = mount(newRole, {
//         mocks: {$t, $tc},
//         localVue,
//         router,
//         i18n
//     });
//
//     it('creates new role', async (done) => {
//         const roleList = await getRoles(); // get initial roles
//
//         // set new role data
//         wrapper.setData({
//             roleInstance: {
//                 role: 'jest-role',
//             },
//         });
//
//         // trigger 'save' button
//         wrapper.find('.primary-btn').trigger('click');
//
//         // wait promise response
//         await setTimeout(async () => {
//             const newRoleList = await getRoles(); // get new roles
//             expect(newRoleList.length).toBe(roleList.length + 1); // compare roles number with initial
//             done();
//         }, 100);
//     });
//
//     it('updates existing role', async (done) => {
//         const roleList = await getRoles(); // load all roles
//         // to find created role id
//         const createdRole = roleList.find(role => {
//             return role.role === 'jest-role'
//         });
//
//         // emulate route path by setting id
//         wrapper.setData({id: createdRole.id});
//
//         // load role by its id
//         await wrapper.vm.loadRole();
//
//         // check if initial role was set correctly
//         expect(wrapper.vm.initialRole).toEqual(createdRole);
//
//         // set updated role data
//         const newRoleInstance = {
//             roleInstance: {
//                 role: 'updated-jest-role',
//             }
//         };
//         wrapper.setData(newRoleInstance);
//
//         // trigger 'save' button
//         wrapper.find('.primary-btn').trigger('click');
//
//         // wait promise response
//         await setTimeout(async () => {
//             // load new list and find updated role
//             const newRoleList = await getRoles();
//             const newRole = newRoleList.find(role => {
//                 return role.role === 'updated-jest-role'
//             });
//
//             // test if there's a role
//             expect(typeof newRole).toBe('object');
//
//             // check if backend role is equal to updated role
//             expect(newRole.role).toEqual(newRoleInstance.roleInstance.role);
//             done();
//         }, 100);
//     });
// });
