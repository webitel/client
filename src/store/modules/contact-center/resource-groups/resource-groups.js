import res from './res-in-group';
import permissions from './permissions';
import proxy from '../../../../utils/editProxy';
import {
    addResGroup, deleteResGroup,
    getResGroup, getResGroupList, updateResGroup
} from "../../../../api/contact-center/resourceGroups/resourceGroups";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'res gr',
            communication: {},
            description: 'res gr descr',
            time: [
                {
                    start: 540,
                    end: 1200,
                }
            ],
        },
    };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};


const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getResGroupList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getResGroup(state.itemId);
    },

    POST_ITEM: async () => {
        return await addResGroup(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateResGroup(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteResGroup(id);
    },

    ADD_VARIABLE_PAIR: (context) => {
        const pair = {start: 540, end: 1200};
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

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
        context.dispatch('ccenter/resGroups/res/RESET_ITEM_STATE', {}, {root: true});
    },

    ...defaultModule.actions,
};

const mutations = {

    ADD_VARIABLE_PAIR: (state, pair) => {
        state.itemInstance.time.push(pair);
    },

    SET_VARIABLE_PROP: (state, {index, prop, value}) => {
        state.itemInstance.time[index][prop] = value;
    },

    DELETE_VARIABLE_PAIR: (state, index) => {
        state.itemInstance.time.splice(index, 1);
    },

    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {res, permissions}
};
