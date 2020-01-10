import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theObjects from '@/components/objects/permissions/objects/the-objects-permissions';
import editObject from '@/components/objects/permissions/objects/opened-object-permissions';
import {getObjectList} from '../../../../src/api/permissions/objects/objects';
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
    const newObjectList = await getObjectList();
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
        await wrapper.vm.loadDataList();

        // find tested object
        testedObject = wrapper.vm.dataList.find(object => {
            return object.class === 'users'
        });

        // and its index
        testedObjectIndex = wrapper.vm.dataList.indexOf(testedObject);
    });


    it('fills objectList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with roleList', () => {
        // check if all data rows were drawn (+1 header row)
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('toggles object ObAC', async (done) => {
        // copy initial ObAC value to prevent it from reactive changing
        const initialObACState = !!testedObject.obac;

        // find all obac switchers and click on tested object's switcher
        wrapper.findAll('.test__object-switcher__obac').at(testedObjectIndex)
            .vm.$emit('input');

        // check if local data have changed
        expect(wrapper.vm.dataList[testedObjectIndex].obac).not.toEqual(initialObACState);

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
        wrapper.findAll('.test__object-switcher__rbac').at(testedObjectIndex)
            .vm.$emit('input');

        // check if local data have changed
        expect(wrapper.vm.dataList[testedObjectIndex].rbac).not.toEqual(initialRbACState);

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

    const findRoleInPermissionsList = (name) => {
        return wrapper.vm.dataList.find(item => {
            return item.name === name;
        });
    };

    beforeAll(async () => {
        // initially load all roles
        await wrapper.vm.loadRoleList();

        testedObject = await getTestedObject();

        // load permissions
        await wrapper.vm.loadDataList(await testedObject.id);
    });

    it('fills permissionsList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('fills roleList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('changes existing role permissions', () => {
        // find tested role
        const testedRole = findRoleInPermissionsList('ioio');

        // find it's index in list
        const testedRoleIndex = wrapper.vm.dataList.indexOf(testedRole);

        // prevent initial value from reactive changes
        initialPermissions = !!wrapper.vm.dataList[testedRoleIndex].access.c;

        // change permissions
        wrapper.findAll('.test__permissions-checkbox__c').at(testedRoleIndex)
            .vm.$emit('toggleCheckbox', !initialPermissions);

        // check if data have changed
        expect(wrapper.vm.dataList[testedRoleIndex].access.c).not.toEqual(initialPermissions);

        // check if grantee id was recoded to change list
        expect(wrapper.vm.changeAccessList).toContain(testedRole.id);
    });

    it('adds new role dropdown select', () => {
        // check if on + press dropdown select appears
        wrapper.findAll('.object-content .icon-icon_plus').trigger('click');
        expect(wrapper.find('.dropdown-select')).toBeTruthy();
    });

    it('find role to select from available', () => {
        // check if chosen role has no permissions
        newRole = wrapper.vm.computeAvailableGrantees.find(item => {
            return item.name === 'obac-test-jest';
        });
        // console.log(wrapper.vm.computeAvailableGrantees)
        expect(newRole).toBeTruthy();
    });

    it('adds permissions to new role', () => {
        wrapper.find('.inline-dropdown').vm.$emit('input', newRole);

        expect(wrapper.vm.changeAccessList).toContain(newRole.id);
    });

    it('removes read permissions from role', () => {
        const testedRole = findRoleInPermissionsList('obac-test-jest');
        const testedRoleIndex = wrapper.vm.dataList.indexOf(testedRole);

        // remove read permissions
        wrapper.findAll('.test__permissions-checkbox__r').at(testedRoleIndex)
            .vm.$emit('toggleCheckbox', false);

        // and check if all other permissions were removed
        const allActionsFalse = Object.values(wrapper.vm.dataList[testedRoleIndex].access)
            .every(action => {
                return !action;
            });

        expect(allActionsFalse).toBeTruthy();
        expect(wrapper.vm.changeAccessList).toContain(testedRole.id);
    });

    it('saves []changes to database', async (done) => {
        wrapper.setData({id: testedObject.id});

        wrapper.find('.object-header .primary-btn').trigger('click');

        setTimeout(async () => {
            await wrapper.vm.loadDataList(testedObject.id);

            const updatedRole = findRoleInPermissionsList('ioio');
            const removedRole = findRoleInPermissionsList('obac-test-jest');

            expect(updatedRole.access.c).toBe(!initialPermissions);
            expect(typeof removedRole).toBe('undefined');
            done();
        }, 100);
    });
});
