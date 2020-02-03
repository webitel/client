import proxy from '../../../../utils/editProxy';
import {
    addStorage,
    deleteStorage,
    getStorage,
    getStorageList, patchStorage,
    updateStorage
} from "../../../../api/integrations/storage/storage";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            maxSize: 10,
            expireDays: 12,
        },
    };
};

const defaultLocalState = () => {
    return {
        name: 'LOCAL NAME',
        maxSize: 10,
        expireDays: 12,
        priority: 0,
        type: 'local',
        properties: {directory: '/path/to/local/dir'}
    };
};

const defaultAWSState = () => {
    return {
        name: 'AWS Storage',
        maxSize: 10,
        expireDays: 12,
        priority: 0,
        type: 'aws',
        properties: {
            keyId: '1010',
            accessKey: '2020',
            bucketName: '4040',
            region: {name: 'US East (Ohio)', value: 'us-east-2'},

        },
    };
};

const defaultDigitalOceanState = () => {
    return {
        name: 'Digital Ocean Storage',
        maxSize: 10,
        expireDays: 12,
        priority: 0,
        type: 'digitalOcean',
        properties: {
            keyId: '1010',
            accessKey: '2020',
            bucketName: '4040',
            region: {name: 'New York City, United States (NYC1)', value: 'NYC1'},
        },
    };
};

const defaultBackblazeState = () => {
    return {
        name: '',
        maxSize: 10,
        expireDays: 12,
        type: 'backblaze',
        // account: '',
        // key: '',
        // bucket: '',
        // bucketId: '',
    };
};

const defaultDropboxState = () => {
    return {
        name: 'Dropbox Storage',
        maxSize: 10,
        expireDays: 12,
        priority: 0,
        type: 'dropbox',
        properties: {
            token: '10102020',
        },
    };
};

const defaultDriveState = () => {
    return {
        name: 'Drive Storage',
        maxSize: 10,
        expireDays: 12,
        priority: 0,
        type: 'drive',
        properties: {
            directory: 'dir_name',
            email: 'email@gmail.com',
            privateKey: '80feoiufewqrewr4t4t43uriot54ut2hrkjt43jk32r',
        },
    };
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
        return await getStorageList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getStorage(state.itemId);
    },

    POST_ITEM: async () => {
        return await addStorage(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        await patchStorage(id, changes);
    },

    UPD_ITEM: async () => {
        await updateStorage(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteStorage(id);
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
        if (state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if (state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_ITEM: async (context, type) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            context.commit('SET_ITEM', proxy(item));
        } else {
            context.dispatch('SET_ITEM_BY_TYPE', type);
        }
    },

    SET_ITEM_BY_TYPE: (context, type) => {
        let item = {};
        switch (type) {
            case 'local':
                item = defaultLocalState();
                break;
            case 'aws':
                item = defaultAWSState();
                break;
            case 'digital-ocean':
                item = defaultDigitalOceanState();
                break;
            case 'backblaze':
                item = defaultBackblazeState();
                break;
            case 'dropbox':
                item = defaultDropboxState();
                break;
            case 'drive':
                item = defaultDriveState();
                break;
        }
        context.commit('SET_ITEM', item);
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    SET_ITEM_PROPERTIES_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTIES_PROPERTY', payload);
        context.dispatch('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    ADD_ITEM: async (context) => {
        if (!state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    TOGGLE_ITEM_PROPERTY: async (context, index) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', index);
        let changes = {disabled: state.dataList[index].disabled};
        try {
            context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
        } catch {
            context.dispatch('LOAD_DATA_LIST');
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

    SET_SIZE: (context, size) => {
        state.size = size;
    },

    SET_SEARCH: (context, search) => {
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

    SET_ITEM_PROPERTIES_PROPERTY: (state, {prop, value}) => {
        state.itemInstance.properties[prop] = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, index) => {
        state.dataList[index].disabled = !state.dataList[index].disabled;
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
