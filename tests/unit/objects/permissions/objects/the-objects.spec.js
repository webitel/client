import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theObjects from '../../../../../src/components/objects/permissions/objects/the-objects';
import editObject from '../../../../../src/components/objects/permissions/objects/objects-edit';
import {getObjects} from '../../../../../src/api/objects/permissions/objects';
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

const getTestedObject = async () => {
    const newObjectList = await getObjects();
    return newObjectList.find(object => {
        return object.class === 'users'
    });
};

describe('the-objects.vue', () => {
    const wrapper = mount(theObjects, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let testedObject;
    let testedObjectIndex;

    beforeAll(async () => {
        // initially load all objects
        await wrapper.vm.loadObjectList();

        // find tested object
        testedObject = wrapper.vm.objectList.find(object => {
            return object.class === 'users'
        });

        // and its index
        testedObjectIndex = wrapper.vm.objectList.indexOf(testedObject);
    });


    it('fills objectList with data', () => {
        expect(wrapper.vm.objectList.length).toBeGreaterThan(0);
    });

    it('draws table with roleList', () => {
        // check if all data rows were drawn (+1 header row)
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.objectList.length + 1);
    });

    it('toggles object ObAC', async (done) => {
        // copy initial ObAC value to prevent it from reactive changing
        const initialObACState = !!testedObject.obac;

        // find all obac switchers and click on tested object's switcher
        wrapper.findAll('.object-switcher.obac').at(testedObjectIndex)
            .vm.$emit('toggleSwitch');

        // check if local data have changed
        expect(wrapper.vm.objectList[testedObjectIndex].obac).not.toEqual(initialObACState);

        // wait for async response
        await setTimeout(async () => {
            // check if db data have changed
            expect(await getTestedObject().obac).not.toEqual(initialObACState);
            done();
        }, 100);
    });

    it('toggles object RbAC', async (done) => {
        // copy initial RbAC value and prevent it from reactive changing
        const initialRbACState = !!testedObject.rbac;

        // find all rbac switchers and click on tested object's switcher
        wrapper.findAll('.object-switcher.rbac').at(testedObjectIndex)
            .vm.$emit('toggleSwitch');

        // check if local data have changed
        expect(wrapper.vm.objectList[testedObjectIndex].rbac).not.toEqual(initialRbACState);

        // wait for async response
        await setTimeout(async () => {
            // check if db data have changed
            expect(await getTestedObject().rbac).not.toEqual(initialRbACState);
            done();
        }, 100);
    });
});

describe('objects-edit.vue', () => {
    const wrapper = mount(editObject, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let testedObject;

    // role to add permissions
    let newRole;

    // used to compare with backend value
    let initialPermissions;

    const findRoleInPermissionsList = (role) => {
        return wrapper.vm.permissionsList.find(grantee => {
            return grantee.grantee.role === role;
        });
    };

    beforeAll(async () => {
        // initially load all roles
        await wrapper.vm.loadRoleList();

        testedObject = await getTestedObject();

        // load permissions
        await wrapper.vm.loadObjectPermissions(await getTestedObject().id);
    });

    it('fills permissionsList with data', () => {
        expect(wrapper.vm.permissionsList.length).toBeGreaterThan(0);
    });

    it('fills roleList with data', () => {
        expect(wrapper.vm.roleList.length).toBeGreaterThan(0);
    });

    it('changes existing role permissions', () => {
        // find tested role
        const testedRole = findRoleInPermissionsList('ioio');

        // find it's index in list
        const testedRoleIndex = wrapper.vm.permissionsList.indexOf(testedRole);

        // prevent initial value from reactive changes
        initialPermissions = !!wrapper.vm.permissionsList[testedRoleIndex].access.c;

        // change permissions
        wrapper.findAll('.role-permissions-checkbox.c').at(testedRoleIndex)
            .vm.$emit('toggleCheckbox', !initialPermissions);

        // check if data have changed
        expect(wrapper.vm.permissionsList[testedRoleIndex].access.c).not.toEqual(initialPermissions);

        // check if grantee id was recoded to change list
        expect(wrapper.vm.changeAccessList).toContain(testedRole.grantee.id);
    });

    it('adds new role dropdown select', () => {
        // check if on + press dropdown select appears
        wrapper.findAll('.page-header .icon-icon_plus').trigger('click');
        expect(wrapper.find('.dropdown-select')).toBeTruthy();
    });

    it('find role to select from available', () => {
        // check if chosen role has no permissions
        newRole = wrapper.vm.computeAvailableGrantees.find(role => {
            return role === 'obac-test-jest';
        });

        expect(newRole).toBeTruthy();
    });

    it('adds permissions to new role', () => {
        wrapper.find('.dropdown-select').vm.$emit('input', newRole);

        const newRoleId = findRoleInPermissionsList(newRole).id;

        expect(wrapper.vm.changeAccessList).toContain(newRoleId);
    });

    it('removes read permissions from role', () => {
        const testedRole = findRoleInPermissionsList('obac-test-jest');

        const testedRoleIndex = wrapper.vm.permissionsList.indexOf(testedRole);

        // remove read permissions
        wrapper.findAll('.role-permissions-checkbox.r').at(testedRoleIndex)
            .vm.$emit('toggleCheckbox', false);

        // and check if all other permissions were removed
        const allActionsFalse = Object.values(wrapper.vm.permissionsList[testedRoleIndex].access)
            .every(action => {
                return !action;
            });

        expect(allActionsFalse).toBeTruthy();
        expect(wrapper.vm.changeAccessList).toContain(testedRole.grantee.id);
    });

    it('saves []changes to database', async (done) => {
        wrapper.setData({id: testedObject.id});

        wrapper.find('.object-header .primary-btn').trigger('click');

        setTimeout(async () => {
            await wrapper.vm.loadObjectPermissions(testedObject.id);

            const updatedRole = findRoleInPermissionsList('ioio');
            const removedRole = findRoleInPermissionsList('obac-test-jest');

            expect(updatedRole.access.c).toBe(!initialPermissions);
            expect(typeof removedRole).toBe('undefined');
            done();
        }, 100);
    });
});
