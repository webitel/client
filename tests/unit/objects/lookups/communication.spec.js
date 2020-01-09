import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theCommunications from '@/components/objects/lookups/communication-types/the-communication-types';
import openedCommunication from '@/components/objects/lookups/communication-types/opened-communication-type';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getCommunicationsList} from "../../../../src/api/lookups/communications/communications";

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('opened communication', () => {
    const wrapper = mount(openedCommunication, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new communication', async (done) => {
        // set new item data
        wrapper.setData({
            itemInstance: {
                name: 'jest-comm-name',
                code: 'jest',
                description: 'jest tests',
            }
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const dataList = await getCommunicationsList(10, 'jest');
            expect(dataList.findIndex(item => item.name.includes('jest'))).not.toBe(-1);
            done();
        }, 300);
    });

    it('updates existing communication', async (done) => {
        const dataList = await getCommunicationsList(10, 'jest');

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
                name: 'upd-jest-comm-name',
                code: 'upd-jest',
                description: 'jest tests',
            }
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newDataList = await getCommunicationsList(10, '*jest');
            const newItem = newDataList.find(item => {
                return item.name.includes('upd-jest');
            });
            expect(newItem).toBeTruthy();
            done();
        }, 100);
    });
});

describe('the communications', () => {
    const wrapper = mount(theCommunications, {
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
            return item.code === 'upd-jest' || item.code === 'jest'
        });

        // and its index
        createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);
    });


    it('fills communicationList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with communicationList', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('removes communication from list', async (done) => {
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
            expect(await getCommunicationsList()).not.toContain(createdItem);
            done();
        }, 100);
    });
});
