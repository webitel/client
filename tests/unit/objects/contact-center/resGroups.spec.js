import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theResGroups from '@/components/objects/contact-center/resource-groups/the-resource-groups';
import openedResGroup from '@/components/objects/contact-center/resource-groups/opened-resource-group';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getResGroupList} from "../../../../src/api/objects/contact-center/resourceGroups";

const $t = () => {
};
const $tc = () => {
};

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuelidate);
const router = new VueRouter();

describe('opened res group', () => {
    const wrapper = mount(openedResGroup, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new res group', async (done) => {
        const dataList = await getResGroupList();

        // set new item data
        wrapper.setData({
            itemInstance: {
                name: 'jest-res-gr',
                communication: {id: 1},
                description: 'jest-res-gr',
                strategy: 'jest-str',
                resList: ['jest', ''],
                timerange: [
                    {
                        start: 540,
                        finish: 1200,
                        limit: 10,
                    }
                ],
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newDataList = await getResGroupList();
            expect(newDataList).toHaveLength(dataList.length + 1);
            done();
        }, 300);
    });

    it('updates existing res group', async (done) => {
        const dataList = await getResGroupList();

        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name === 'jest-res-gr'
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
                name: 'upd-jest-res-gr',
                communication: {id: 1},
                description: 'upd-jest',
                strategy: 'upd-jest',
                resList: ['upd', ''],
                timerange: [
                    {
                        start: 540,
                        finish: 1200,
                        limit: 9,
                    }
                ],
            },
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated item
            const newDataList = await getResGroupList();
            const newItem = newDataList.find(item => {
                return item.name === 'upd-jest-res-gr'
            });

            expect(newItem).toBeTruthy();

            // check if backend item is equal to updated
            expect(newItem.name).toEqual(newItemInstance.itemInstance.name);
            done();
        }, 100);
    });
});

describe('the res groups', () => {
    const wrapper = mount(theResGroups, {
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
            return item.name === 'upd-jest-res-gr'
        });

        // and its index
        createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);
    });


    it('fills resGrList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with resGrList', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('removes res group from list', async (done) => {
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
            expect(await getResGroupList()).not.toContain(createdItem);
            done();
        }, 100);
    });
});
