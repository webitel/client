import proxy from '../../../../utils/editProxy';
import {
    addUser,
    deleteUser,
    getUser,
    getUsersList,
    patchUser,
    updateUser
} from "../../../../api/objects/directory/users";

const defaultItem = {
    name: 'default user name' + Math.random(),
    username: 'defaultuserlogin' + Math.random(),
    password: '',
    extension: '1007',
    roles: [{name: 'ioio', id: '1011963'}],
    roleAdmin: [],
    license: null,
    devices: [],
    variables: [
        {key: 'integration_id', value: 'user@external.app'}
    ],
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    itemId: 0,
    itemInstance: {},
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getUsersList(state.size, state.search);
        context.dispatch('SET_ITEM_ID', 0);
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    PATCH_ITEM_PEROPERTY: async (context, {value, index}) => {
        await context.commit('PATCH_ITEM_PEROPERTY', {value, index});
        let user = {status: value};
        try {
            await patchUser(state.dataList[index].id, user);
        } catch  {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    TOGGLE_ITEM_PROPERTY: async (context, index) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', index);
        let user = {dnd: state.dataList[index].dnd};
        try {
            await patchUser(state.dataList[index].id, user);
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_ITEM: async (context) => {
        let item;
        if (state.itemId) {
            item = await getUser(state.itemId);
            item = proxy(item);
        } else {
            item = defaultItem;
        }
        context.commit('SET_ITEM', item);
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_VARIABLE_PAIR: (context) => {
        const pair = {key: '', value: ''};
        context.commit('ADD_VARIABLE_PAIR', pair);
    },

    SET_VARIABLE_PROP: (context, {index, prop, value}) => {
        context.commit('SET_VARIABLE_PROP', {index, prop, value});
    },

    DELETE_VARIABLE_PAIR: (context, index) => {
        context.commit('DELETE_VARIABLE_PAIR', index);
    },

    ADD_ITEM: async (context) => {
        const id = await addUser(state.itemInstance);
        context.dispatch('SET_ITEM_ID', id);
    },

    UPDATE_ITEM: async () => {
        if (state.itemInstance._dirty) {
            await updateUser(state.itemId, state.itemInstance);
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteUser(id);
        } catch {
        }
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

    ADD_VARIABLE_PAIR: (state, pair) => {
        state.itemInstance.variables.unshift(pair);
    },

    SET_VARIABLE_PROP: (state, {index, prop, value}) => {
        state.itemInstance.variables[index][prop] = value;
    },

    DELETE_VARIABLE_PAIR: (state, index) => {
        state.itemInstance.variables.splice(index, 1);
    },

    PATCH_ITEM_PEROPERTY: (state, {value, index}) => {
        state.dataList[index].status = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, index) => {
        state.dataList[index].dnd = !state.dataList[index].dnd;
    },

    SET_ITEM: (state, item) => {
        state.itemInstance = item;
    },

    REMOVE_ITEM: (state, index) => {
        state.dataList.splice(index, 1);

    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
