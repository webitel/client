import router from '../../../../router/router';
import proxy from '../../../../utils/editProxy';
import {
    addGateway, deleteGateway,
    getGateway, getGatewayList, updateGateway
} from "../../../../api/routing/gateways/gateways";

const defaultState = () => {
    return {
        itemId: 0,
        ...defaultTrunkingItem(),
        ...defaultRegisterItem(),
    }
};

const defaultTrunkingItem = () => {
    return {
        itemInstance: {
            name: '01trunking-test',
            proxy: '10.12.13.14',
            description: '',
            schema: {},
            id: 0,
            host: '10.12.13.14',
            ipacl: [{
                ip: '10.12.13.14',
                proto: 'any',
                port: null
            }],
            enable: true,
        },
    }
};

const defaultRegisterItem = () => {
    return {
        itemInstance: {
            register: true,
            name: '01reg-test',
            registrar: '10.12.13.14',
            expires: 600,
            password: 'fizzbuzz',
            description: '',
            username: '',
            accountName: 'wetel',
            proxy: '',
            domain: '',
            schema: {},
            enable: true,
            id: 0,
        },
    }
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    page: 0,
    isNextPage: true,
    ...defaultState()
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getGatewayList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getGateway(state.itemId);
    },

    POST_ITEM: async () => {
        return await addGateway(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        // FIXME: ADD PATCH TO SWITCHER
    },

    UPD_ITEM: async () => {
        await updateGateway(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteGateway(id);
    },

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response.list);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
        if(state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if(state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    TOGGLE_ITEM_PROPERTY: async (context, index) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', index);
        let changes = {enable: state.dataList[index].enable};
        try {
            context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_REGISTER_ITEM: async (context) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            if (!item.register) {
                router.replace('/routing/gateways/trunking/' + item.id);
                return;
            }
            context.commit('SET_REGISTER_ITEM', proxy(item));
        } else {
            context.commit('SET_REGISTER_ITEM');
        }
    },

    LOAD_TRUNKING_ITEM: async (context) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            if (item.register) {
                router.replace('/routing/gateways/register/' + item.id);
                return;
            }
            context.commit('SET_TRUNKING_ITEM', proxy(item));
        } else {
            context.commit('SET_TRUNKING_ITEM');
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_VARIABLE_PAIR: (context) => {
        const pair = {ip: '', proto: 'any', port: null};
        context.commit('ADD_VARIABLE_PAIR', pair);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    SET_VARIABLE_PROP: (context, {index, prop, value}) => {
        context.commit('SET_VARIABLE_PROP', {index, prop, value});
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    DELETE_VARIABLE_PAIR: (context, index) => {
        context.commit('DELETE_VARIABLE_PAIR', index);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    ADD_ITEM: async (context) => {
        if(!state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            await context.dispatch('SET_ITEM_ID', id);
            state.itemInstance.register ?
                context.dispatch('LOAD_REGISTER_ITEM') :
                context.dispatch('LOAD_TRUNKING_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await context.dispatch('UPD_ITEM');
            state.itemInstance.register ?
                context.dispatch('LOAD_REGISTER_ITEM') :
                context.dispatch('LOAD_TRUNKING_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await context.dispatch('DELETE_ITEM', id);
        } catch {
        }
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_ITEM_ID: (state, id) => {
        state.itemId = id;
    },

    SET_DATA_LIST: (state, list) => {
        state.dataList = list;
    },

    SET_SIZE: (state, size) => {
        state.size = size;
    },

    SET_SEARCH: (state, search) => {
        state.search = search;
    },

    INCREMENT_PAGE: (state) => {
        state.page++;
    },

    DECREMENT_PAGE: (state) => {
        state.page--;
    },

    SET_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance[prop] = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, index) => {
        state.dataList[index].enable = !state.dataList[index].enable;
    },

    SET_REGISTER_ITEM: (state, item) => {
        if(item) {
            state.itemInstance = item;
        } else {
            Object.assign(state, defaultState(), defaultRegisterItem());
        }
    },

    SET_TRUNKING_ITEM: (state, item) => {
        if(item) {
            state.itemInstance = item;
        } else {
            Object.assign(state, defaultState(), defaultTrunkingItem());
        }
    },

    ADD_VARIABLE_PAIR: (state, pair) => {
        state.itemInstance.ipacl.push(pair);
    },

    SET_VARIABLE_PROP: (state, {index, prop, value}) => {
        state.itemInstance.ipacl[index][prop] = value;
    },

    DELETE_VARIABLE_PAIR: (state, index) => {
        state.itemInstance.ipacl.splice(index, 1);
    },

    REMOVE_ITEM: (state, index) => {
        state.dataList.splice(index, 1);
    },

    RESET_ITEM_STATE: (state) => {
        Object.assign(state, defaultState());
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
