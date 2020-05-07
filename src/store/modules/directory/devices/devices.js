import history from './history';
import {
    addDevice, deleteDevice,
    getDevice, getDeviceList, updateDevice
} from "../../../../api/directory/devices/devices";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
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
            hotdesk: false,
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

    ...defaultModule.actions,
};

const mutations = {
    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {history}
};
