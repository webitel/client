import history from './history';
import permissions from './permissions';
import {
    addDevice, deleteDevice,
    getDevice, getDeviceList, updateDevice
} from "../../../../api/directory/devices/devices";
import {DefaultModule} from "../../defaults/DefaultModule";
import router from "../../../../router/router";
import proxy from "../../../../utils/editProxy";

const defaultState = () => {
    return {
        itemId: 0,
        ...defaultItem(),
        ...defaultHotdeskItem(),
    }
};

const defaultItem = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            account: '',
            password: '',
            user: {},
            phone: {},
            ip: '',
            brand: '',
            model: '',
            mac: '',
            vars: [],
        },
    };
};

const defaultHotdeskItem = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            account: '',
            password: '',
            user: {},
            phone: {},
            ip: '',
            brand: '',
            model: '',
            mac: '',
            hotdesks: [],
            hotdesk: true,
            vars: [],
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
        return await getDeviceList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getDevice(state.itemId);
    },

    POST_ITEM: async () => {
        return await addDevice(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateDevice(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteDevice(id);
    },

    LOAD_HOTDESK_ITEM: async (context) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            if (!item.hotdesk) {
                router.replace('/directory/devices/' + item.id);
                return;
            }
            context.commit('SET_HOTDESK_ITEM', proxy(item));
        } else {
            context.commit('SET_HOTDESK_ITEM');
        }
    },

    LOAD_SINGLE_ITEM: async (context) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            if (item.hotdesk) {
                router.replace('/directory/devices/hotdesk/' + item.id);
                return;
            }
            context.commit('SET_SINGLE_ITEM', proxy(item));
        } else {
            context.commit('SET_SINGLE_ITEM');
        }
    },

    ...defaultModule.actions,
};

const mutations = {

    SET_SINGLE_ITEM: (state, item) => {
        if(item) {
            state.itemInstance = item;
        } else {
            Object.assign(state, defaultState(), defaultItem());
        }
    },

    SET_HOTDESK_ITEM: (state, item) => {
        if(item) {
            state.itemInstance = item;
        } else {
            Object.assign(state, defaultState(), defaultHotdeskItem());
        }
    },

    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {history, permissions}
};
