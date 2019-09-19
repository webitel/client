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

describe('objects-edit.vue', () => {
    const wrapper = mount(editObject, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let testedObject;
    let initialPermissions;
    beforeAll(async () => {
        // initially load all roles
        await wrapper.vm.loadRoleList();

        // find tested object
        const objectList = await getObjects();
        testedObject = objectList.find(object => {
            return object.class === 'users'
        });
        await wrapper.vm.loadObjectPermissions(testedObject.id);
    });

    it('fills permissionsList with data', () => {
        expect(wrapper.vm.permissionsList.length).toBeGreaterThan(0);
    });

    it('fills roleList with data', () => {
        expect(wrapper.vm.roleList.length).toBeGreaterThan(0);
    });

    it('changes existing role permissions', () => {
        const testedRole = wrapper.vm.permissionsList.find(grantee => {
            return grantee.grantee.role === 'ioio';
        });
        const testedRoleIndex = wrapper.vm.permissionsList.indexOf(testedRole);

        initialPermissions = !!wrapper.vm.permissionsList[testedRoleIndex].access.c;

        wrapper.findAll('.role-permissions-checkbox.c').at(testedRoleIndex)
            .vm.$emit('toggleCheckbox', !initialPermissions);

        expect(wrapper.vm.permissionsList[testedRoleIndex].access.c).toBe(!initialPermissions);
        expect(wrapper.vm.changeAccessList.indexOf(testedRole.grantee.id)).not.toBe(-1);
    });

    it('adds permissions to new role', () => {
        const newRole = wrapper.vm.computeAvailableGrantees.find(role => {
            return role === 'obac-test-jest';
        });

        expect(typeof newRole).toBe('string');

        wrapper.findAll('.page-header .icon-icon_plus').trigger('click');

        expect(wrapper.findAll('.dropdown-select').length).toBe(1);

        wrapper.find('.dropdown-select').vm.$emit('input', newRole);

        const newRoleId = wrapper.vm.roleList.find(grantee => {
            return grantee.role === newRole
        }).id;

        const isRoleInAccessChanges = wrapper.vm.changeAccessList.includes(newRoleId);

        expect(isRoleInAccessChanges).toBe(true);
    });

    it('removes read permissions from role', () => {
        const testedRole = wrapper.vm.permissionsList.find(grantee => {
            return grantee.grantee.role === 'obac-test-jest';
        });

        const testedRoleIndex = wrapper.vm.permissionsList.indexOf(testedRole);

        expect(wrapper.vm.permissionsList[testedRoleIndex].access.r).toBe(true);

        wrapper.findAll('.role-permissions-checkbox.r').at(testedRoleIndex)
            .vm.$emit('toggleCheckbox', false);

        const allActionsFalse = Object.values(wrapper.vm.permissionsList[testedRoleIndex].access)
            .every(action => {
                return !action;
            });
        expect(allActionsFalse).toBe(true);
        expect(wrapper.vm.changeAccessList.indexOf(testedRole.grantee.id)).not.toBe(-1);
    });

    it('saves [remove read]changes to database', async (done) => {
        wrapper.setData({id: testedObject.id});
        wrapper.find('.object-header .primary-btn').trigger('click');

        setTimeout(async () => {
            await wrapper.vm.loadObjectPermissions(testedObject.id);
            const testedUpdatedRole = wrapper.vm.permissionsList.find(grantee => {
                return grantee.grantee.role === 'ioio';
            });
            const testedRemovedRole = wrapper.vm.permissionsList.find(grantee => {
                return grantee.grantee.role === 'obac-test-jest';
            });
            expect(testedUpdatedRole.access.c).toBe(!initialPermissions);
            expect(typeof testedRemovedRole).toBe('undefined');
            done();
        }, 100);
    });
});
