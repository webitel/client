import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theDevices from '../../../../src/components/directory/devices/the-devices';
import openedDevice from '../../../../src/components/directory/devices/opened-device';
import deviceHistoryPopup from '../../../../src/components/directory/devices/device-history-popup';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getDeviceList} from "../../../../src/api/directory/devices/devices";

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('opened device', () => {
    const wrapper = mount(openedDevice, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new device', async (done) => {
        // set new item data
        wrapper.setData({
            itemInstance: {
                name: 'jest-device',
                account: '1234',
                password: 'pass',
                user: {},
                phone: '8 800 555 3535',
                ip: '10.10.10.118',

                vendor: 'jest-vendor',
                model: 'jest-model',
                mac: '88-5E-C0-3C-84-44',
                hotdesk: [],
                vars: [],
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const dataList = await getDeviceList(10, 'jest');
            expect(dataList.findIndex(item => item.name.includes('jest'))).not.toBe(-1);
            done();
        }, 300);
    });

    it('updates existing device', async (done) => {
        const dataList = await getDeviceList(10, 'jest');

        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name.includes('jest');
        });

        // emulate route path by setting id
        wrapper.setData({id: createdItem.id});

        // load item by its id
        await wrapper.vm.loadItem();

        // check if initial item was set correctly
        expect(wrapper.vm.initialItem.id).toEqual(createdItem.id);

        // set updated item data
        const newItemInstance = {
            itemInstance: {
                name: 'upd-jest-device',
                account: '1234',
                password: 'pass',
                user: {},
                phone: '8 800 555 3535',
                ip: '10.10.10.121',

                vendor: 'upd-jest-vendor',
                model: 'upd-jest-model',
                mac: '88-5E-C0-3C-84-44',
                hotdesk: [],
                vars: [],
            },
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated item
            const newDataList = await getDeviceList(10, '*jest');
            const newItem = newDataList.find(item => {
                return item.name.includes('upd-jest');
            });
            expect(newItem).toBeTruthy();
            done();
        }, 100);
    });
});

describe('the devices', () => {
    const wrapper = mount(theDevices, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    let createdItem;
    let createdItemIndex;
    // initially load all items
    beforeAll(async () => {
        await wrapper.vm.loadDataList();

        // find tested item
        createdItem = wrapper.vm.dataList.find(item => {
            return item.name.includes('jest')
        });

        // and its index
        createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);
    });


    it('fills device list with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with device list', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('removes device from list', async (done) => {
        // test if there's initially a item
        expect(createdItem).toBeTruthy();

        // find all delete icons and choose tested item by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(createdItemIndex)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove item and check if it removed from list
            expect(wrapper.vm.dataList).not.toContain(createdItem);

            // check if it removed from database
            expect(await getDeviceList()).not.toContain(createdItem);
            done();
        }, 100);
    });
});