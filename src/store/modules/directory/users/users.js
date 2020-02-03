import proxy from '../../../../utils/editProxy';
import {
    addUser, deleteUser, getUser,
    getUsersList, patchUser, updateUser
} from "../../../../api/directory/users/users";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'default user name' + Math.random(),
            username: 'defaultuserlogin' + Math.random(),
            password: '',
            extension: '1007',
            roles: [],
            // roleAdmin: [],
            license: [],
            devices: [],
            variables: [
                {key: 'integration_id', value: 'user@external.app'}
            ],
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
        return await getUsersList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getUser(state.itemId);
    },

    POST_ITEM: async () => {
        return await addUser(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        await patchUser(id, changes);
    },

    UPD_ITEM: async () => {
        await updateUser(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteUser(id);
    },

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
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

    PATCH_ITEM_PEROPERTY: async (context, {value, index}) => {
        await context.commit('PATCH_ITEM_PEROPERTY', {value, index});
        let changes = {status: value};
        try {
            await context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
        } catch  {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    TOGGLE_ITEM_PROPERTY: async (context, index) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', index);
        let changes = {dnd: state.dataList[index].dnd};
        try {
            await context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_ITEM: async (context) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_VARIABLE_PAIR: (context) => {
        const pair = {key: '', value: ''};
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
        if (!state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await context.dispatch('UPD_ITEM');
            context.dispatch('LOAD_ITEM');
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

    ADD_VARIABLE_PAIR: (state, pair) => {
        state.itemInstance.variables.push(pair);
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
