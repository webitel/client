import router from '../../../../router/router';
import proxy from '../../../../utils/editProxy';
import {
    addGateway, deleteGateway,
    getGateway, getGatewayList, patchGateway, updateGateway
} from "../../../../api/routing/gateways/gateways";
import {DefaultModule} from "../../defaults/DefaultModule";

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
            name: '',
            proxy: '',
            description: '',
            schema: {},
            id: 0,
            host: '',
            ipacl: [{
                ip: '',
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
            name: '',
            registrar: '',
            expires: 600,
            password: '',
            description: '',
            username: '',
            accountName: '',
            proxy: '',
            domain: '',
            schema: {},
            enable: true,
            id: 0,
        },
    }
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {

    ...defaultModule.actions,

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
       await patchGateway(id, changes);
    },

    UPD_ITEM: async () => {
        await updateGateway(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteGateway(id);
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

    PATCH_ITEM_PROPERTY: async (context, {value, index}) => {
        let changes = {enable: value};
        try {
            await context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
            context.commit('PATCH_ITEM_PROPERTY', {value, index});
        } catch {
            await context.dispatch('LOAD_DATA_LIST');
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


};

const mutations = {

    ...defaultModule.mutations,

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

    PATCH_ITEM_PROPERTY: (state, {value, index}) => {
        state.dataList[index].enable = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
