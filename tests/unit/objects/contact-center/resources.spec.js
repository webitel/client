import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theRes from '@/components/objects/contact-center/resources/the-resources';
import openedRes from '@/components/objects/contact-center/resources/opened-resource';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getResourceList} from "../../../../src/api/objects/contact-center/resources";

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('opened communication', () => {
    const wrapper = mount(openedRes, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new communication', async (done) => {
        const dataList = await getResourceList();

        // set new item data
        wrapper.setData({
            itemInstance: {
                name: 'jest-res',
                gateway: {id: 1},
                cps: 110,
                limit: 110,
                description: 'jest-res',
                numberList: ['1', '2'],
                maxErrors: 2,
                errorIds: [{text: '23x'}],
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newDataList = await getResourceList();
            expect(newDataList).toHaveLength(dataList.length + 1);
            done();
        }, 300);
    });

    it('updates existing communication', async (done) => {
        const dataList = await getResourceList();

        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name === 'jest-res'
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
                name: 'upd-jest-res',
                gateway: {id: 1},
                cps: 113,
                limit: 113,
                description: 'upd-jest-res',
                numberList: ['1', '2'],
                maxErrors: 20,
                errorIds: [{text: '553x'}],
            },
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated item
            const newDataList = await getResourceList();
            const newItem = newDataList.find(item => {
                return item.name === 'upd-jest-res'
            });

            expect(newItem).toBeTruthy();

            // check if backend item is equal to updated
            expect(newItem.name).toEqual(newItemInstance.itemInstance.name);
            done();
        }, 100);
    });
});

describe('the communications', () => {
    const wrapper = mount(theRes, {
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
            return item.name === 'upd-jest-res'
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
            expect(await getResourceList()).not.toContain(createdItem);
            done();
        }, 100);
    });
});
