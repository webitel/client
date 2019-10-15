import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theGateways from '@/components/objects/routing/gateways/the-sip-gateways';
import gatewaysPopup from '@/src/components/objects/routing/gateways/create-gateway-popup';
import registerGateway from '@/src/components/objects/routing/gateways/opened-register-sip-gateway';
import trunkingGateway from '@/src/components/objects/routing/gateways/opened-trunking-sip-gateway';
import {getGatewayList} from '@/src/api/objects/routing/gateways';
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

describe('opened-register-gateway.vue', () => {
    const wrapper = mount(registerGateway, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new register gateway', async (done) => {
        const dataList = await getGatewayList(); // get initial gateways

        // set new register gateway data
        wrapper.setData({
            itemInstance: {
                // role: 'jest-role',
            },
        });

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            const newDataList = await getGatewayList(); // get new gateways
            expect(newDataList).toHaveLength(dataList.length + 1); // compare gateways number with initial
            done();
        }, 300);
    });

    it('updates this register gateway', async (done) => {
        const dataList = await getGatewayList(); // load all items
        // to find created item id
        const createdRegGateway = dataList.find(item => {
            // return role.role === 'jest-role'
        });

        // emulate item path by setting id
        wrapper.setData({id: createdRegGateway.id});

        // load item by its id
        await wrapper.vm.loadItem();

        // check if initial item was set correctly
        expect(wrapper.vm.initialItem).toEqual(createdRegGateway);

        // set updated item data
        const newItemInstance = {
            itemInstance: {
                // role: 'updated-jest-role',
            }
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated role
            const newDataList = await getGatewayList();
            const newItem = newDataList.find(item => {
                // return role.role === 'updated-jest-role'
            });

            // test if there's a role
            expect(newItem).toBeTruthy();

            // check if backend role is equal to updated role
            expect(newItem.prop).toEqual(newItemInstance.itemInstance.prop);
            done();
        }, 100);
    });
});


describe('opened-trunking-gateway.vue', () => {
    const wrapper = mount(trunkingGateway, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    it('creates new trunking gateway', async (done) => {

    });

    it('updates this trunking gateway', async (done) => {

    });
});