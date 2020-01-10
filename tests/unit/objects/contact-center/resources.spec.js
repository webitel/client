import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theRes from '@/components/objects/contact-center/resources/the-resources';
import openedRes from '@/components/objects/contact-center/resources/opened-resource';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getResourceList} from "../../../../src/api/contact-center/resources/resources";
import {getResGroupList} from "../../../../src/api/contact-center/resourceGroups/resourceGroups";
import {getDeviceList} from "../../../../src/api/directory/devices/devices";

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('opened res', () => {
    const wrapper = mount(openedRes, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new res', async (done) => {
        // set new item data
        wrapper.setData({
            itemInstance: {
                res: {
                    name: 'jest-res',
                    gateway: {name: "itemInstance", id: "104"},
                    cps: 110,
                    limit: 110,
                    description: 'jest-res',
                    maxErrors: 2,
                    errorIds: [{text: '23x'}],
                },
                numberList: [{display: '1'}, {display: '2'}],
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const dataList = await getResourceList(10, 'jest');
            expect(dataList.findIndex(item => item.name.includes('jest'))).not.toBe(-1);
            done();
        }, 300);
    });

    it('updates existing res', async (done) => {
        const dataList = await getResourceList(10, 'jest');

        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name.includes('jest');
        });

        // emulate route path by setting id
        wrapper.setData({id: createdItem.id});

        // load item by its id
        await wrapper.vm.loadItem();

        // check if initial item was set correctly
        expect(wrapper.vm.initialItem.res.id).toEqual(createdItem.id);
        const newItemInstance = {
            itemInstance: {
                res: {
                    name: 'upd-jest-res',
                    gateway: {name: "itemInstance", id: "104"},
                    cps: 110,
                    limit: 110,
                    description: 'upd-jest-res',
                    maxErrors: 2,
                    errorIds: [{text: '223x'}],
                },
                numberList: [{display: '21'}, {display: 'upd-2'}],
            },
        };

        // set updated item data
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated item
            const newDataList = await getResourceList(10, '*jest');
            const newItem = newDataList.find(item => {
                return item.name.includes('upd-jest');
            });
            expect(newItem).toBeTruthy();
            done();
        }, 100);
    });
});

describe('the res', () => {
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
            return item.name === 'upd-jest-res' || 'jest-res'
        });

        // and its index
        createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);
    });


    it('fills resList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with resList', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('updates resource enable switchers', async (done) =>{
        // copy initial value and prevent it from reactive changing
        const initialEnableState = !!createdItem.enabled;

        // find all switchers and click on tested object's switcher
        wrapper.findAll('.test__resources__enable-switcher').at(createdItemIndex)
            .vm.$emit('input');

        // check if local data have changed
        expect(wrapper.vm.dataList[createdItemIndex].enabled).not.toEqual(initialEnableState);

        // wait for async response
        await setTimeout(async () => {
            // check if db data have changed
            const newDataList = await getResourceList();
            const newItem = newDataList.find(item => {
                return item.name === 'upd-jest-res' || 'jest-res'
            });
            expect(await newItem.enabled).not.toEqual(initialEnableState);
            done();
        }, 100);
    });

    it('updates resource reserve switchers', async (done) =>{
        // copy initial value and prevent it from reactive changing
        const initialReserveState = !!createdItem.reserve;

        // find all switchers and click on tested object's switcher
        wrapper.findAll('.test__resources__reserve-switcher').at(createdItemIndex)
            .vm.$emit('input');

        // check if local data have changed
        expect(wrapper.vm.dataList[createdItemIndex].reserve).not.toEqual(initialReserveState);

        // wait for async response
        await setTimeout(async () => {
            // check if db data have changed
            const newDataList = await getResourceList();
            const newItem = newDataList.find(item => {
                return item.name === 'upd-jest-res' || 'jest-res'
            });
            expect(await newItem.reserve).not.toEqual(initialReserveState);
            done();
        }, 100);
    });

    it('removes res from list', async (done) => {
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
})
;
