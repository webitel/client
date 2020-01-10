import {shallowMount, mount, createLocalVue} from '@vue/test-utils'
import theGateways from '../../../../src/components/routing/sip-gateways/the-sip-gateways';
import registerGateway from '../../../../src/components/routing/sip-gateways/opened-register-sip-gateway';
import trunkingGateway from '../../../../src/components/routing/sip-gateways/opened-trunking-sip-gateway';
import {getGatewayList} from '../../../../src/api/routing/gateways/gateways';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import i18n from 'vue-i18n';
import {getRoleList} from "../../../../src/api/permissions/roles/roles";

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
                register: true,
                name: 'jest-name',
                registrar: 'jest.registrar',
                expires: 1200,
                password: 'jest-pass',
                description: 'jest-descr',
                username: 'jest-auth-id',
                accountName: 'jest-account',
                proxy: 'jest.proxy',
                domain: 'jest.domain',
                id: 0,
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
            return item.name === 'jest-name'
        });
        // emulate item path by setting id
        wrapper.setData({id: createdRegGateway.id});

        // load item by its id
        await wrapper.vm.loadItem();

        // set updated item data
        const newItemInstance = {
            itemInstance: {
                register: true,
                name: 'upd-jest-name',
                registrar: 'upd-jest.registrar',
                expires: 2300,
                password: 'upd-jest-pass',
                description: 'upd-jest-descr',
                username: 'upd-jest-auth-id',
                accountName: 'jest-account',
                proxy: 'upd-jest.proxy',
                domain: 'upd-jest.domain',
            }
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated role
            const newDataList = await getGatewayList();
            // console.log('CREATED TEST', createdRegGateway);
            const newItem = newDataList.find(item => {
                return item.name = 'upd-jest-name';
            });

            // test if there's a role
            expect(newItem).toBeTruthy();

            // check if backend role is equal to updated role
            expect(newItem.name).toEqual(newItemInstance.itemInstance.name);
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
        const dataList = await getGatewayList(); // get initial items

        // set new item data
        wrapper.setData({
            itemInstance: {
                name: 'jest-trunking-name',
                proxy: 'jest-trunking-proxy.jest',
                description: 'jest-trunking-descr',
                host: 'jest-trunking-host.jest',
                ipacl: [
                    {
                        ip: '12.21.23.43',
                        proto: 'any',
                        port: 1
                    },
                    {
                        ip: '35.55.23.12',
                        proto: 'udp',
                        port: 0
                    },
                ],
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

    it('updates this trunking gateway', async (done) => {
        const dataList = await getGatewayList(); // load all items
        // to find created item id
        const createdItem = dataList.find(item => {
            return item.name === 'jest-trunking-name'
        });
        // emulate item path by setting id
        wrapper.setData({id: createdItem.id});

        // load item by its id
        await wrapper.vm.loadItem();

        // set updated item data
        const newItemInstance = {
            itemInstance: {
                name: 'upd-jest-trunking-name',
                proxy: 'upd-jest-trunking-proxy.jest',
                description: 'upd-jest-trunking-descr',
                host: 'upd-jest-trunking-host.jest',
                ipacl: [
                    {
                        ip: '12.21.23.43',
                        proto: 'udp',
                        port: 0
                    },
                    {
                        ip: '35.15.23.12',
                        proto: 'tcp',
                        port: 100
                    },
                ],
            },
        };
        wrapper.setData(newItemInstance);

        // trigger 'save' button
        wrapper.find('.primary-btn').trigger('click');

        // wait promise response
        await setTimeout(async () => {
            // load new list and find updated role
            const newDataList = await getGatewayList();
            const newItem = newDataList.find(item => {
                return item.name === 'upd-jest-trunking-name';
            });

            // test if there's a role
            expect(newItem).toBeTruthy();

            // check if backend item is equal to updated item
            expect(newItem.name).toEqual(newItemInstance.itemInstance.name);
            done();
        }, 300);
    });
});

describe('the-gateways.vue', () => {
    const wrapper = mount(theGateways, {
        mocks: {$t, $tc},
        localVue,
        router,
        i18n
    });

    // let createdItem;
    // let createdItemIndex;

    it('fills dataList with data', () => {
        expect(wrapper.vm.dataList.length).toBeGreaterThan(0);
    });

    it('draws table with dataList', () => {
        expect(wrapper.findAll('tr')).toHaveLength(wrapper.vm.dataList.length + 1);
    });

    it('removes register item from list', async (done) => {
        await wrapper.vm.loadDataList();
        // find tested role
        const createdItem = wrapper.vm.dataList.find(item => {
            return item.name === 'upd-jest-name'
        });
        // and its index
        const createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);

        // test if there's initially an item
        expect(createdItem).toBeTruthy();

        // find all delete icons and choose tested role by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(createdItemIndex)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove role and check if it removed from list
            expect(wrapper.vm.dataList).not.toContain(createdItem);

            // check if it removed from database
            expect(await getRoleList()).not.toContain(createdItem);
            done();
        }, 100);
    });

    it('removes trunking item from list', async (done) => {

        await wrapper.vm.loadDataList();
        // find tested role
        const createdItem = wrapper.vm.dataList.find(item => {
            return item.name === 'upd-jest-trunking-name'
                || item.name === 'jest-trunking-name'
        });
        // and its index
        const createdItemIndex = wrapper.vm.dataList.indexOf(createdItem);

        // test if there's initially an item
        expect(createdItem).toBeTruthy();

        // find all delete icons and choose tested role by index
        wrapper.findAll('.vuetable-action.icon-icon_delete').at(createdItemIndex)
            .trigger('click');

        // wait for async response
        await setTimeout(async () => {
            // remove role and check if it removed from list
            expect(wrapper.vm.dataList).not.toContain(createdItem);

            // check if it removed from database
            expect(await getRoleList()).not.toContain(createdItem);
            done();
        }, 100);
    });
});
