import proxy from '../../../../utils/editProxy';
import {
    addUser, deleteUser, getUser,
    getUsersList, patchUser, updateUser
} from "../../../../api/directory/users/users";
import {DefaultModule} from "../../defaults/DefaultModule";

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

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
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

    ...defaultModule.actions,
};

const mutations = {
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

    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
