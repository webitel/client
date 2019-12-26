import router from '@/router/router';
import proxy from '../../../../utils/editProxy';
import {
    addGateway,
    deleteGateway,
    getGateway,
    getGatewayList,
    updateGateway
} from "../../../../api/objects/routing/gateways";

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
            schema: '',
            id: 0,
            host: '10.12.13.14',
            ipacl: [{
                ip: '10.12.13.14',
                proto: 'any',
                port: null
            }],
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
            schema: '',
            id: 0,
        },
    }
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    ...defaultState()
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getGatewayList(state.size, state.search);
        context.commit('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    TOGGLE_ITEM_PROPERTY: async (context, index) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', index);
        // let user = {dnd: state.dataList[index].enable};
        try {
            // await patchGate(state.dataList[index].id, user);
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_REGISTER_ITEM: async (context) => {
        if (state.itemId) {
            const item = await getGateway(state.itemId);
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
            const item = await getGateway(state.itemId);
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
            const id = await addGateway(state.itemInstance);
            await context.dispatch('SET_ITEM_ID', id);
            state.itemInstance.register ?
                context.dispatch('LOAD_REGISTER_ITEM') :
                context.dispatch('LOAD_TRUNKING_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await updateGateway(state.itemId, state.itemInstance);
            state.itemInstance.register ?
                context.dispatch('LOAD_REGISTER_ITEM') :
                context.dispatch('LOAD_TRUNKING_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteGateway(id);
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

    SET_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance[prop] = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, index) => {
        state.dataList[index].dnd = !state.dataList[index].dnd;
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
