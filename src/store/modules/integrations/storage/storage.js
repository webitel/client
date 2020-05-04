import proxy from '../../../../utils/editProxy';
import {
    addStorage,
    deleteStorage,
    getStorage,
    getStorageList, patchStorage,
    updateStorage
} from "../../../../api/integrations/storage/storage";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            maxSize: 0,
            expireDays: 0,
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

const defaultS3State = () => {
    return {
        name: 'S3 Storage',
        maxSize: 10,
        expireDays: 12,
        priority: 0,
        type: 's3',
        properties: {
            keyId: '1010',
            accessKey: '2020',
            bucketName: '4040',
            region: {},
            endpoint: '',
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

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};


const getters = {};

const actions = {

    ...defaultModule.actions,

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

    SET_ITEM_BY_TYPE: (context, type) => {
        let item = {};
        switch (type) {
            case 'local':
                item = defaultLocalState();
                break;
            case 's3':
                item = defaultS3State();
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

    SET_ITEM_PROPERTIES_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTIES_PROPERTY', payload);
        context.dispatch('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },
};

const mutations = {

    SET_ITEM_PROPERTIES_PROPERTY: (state, {prop, value}) => {
        state.itemInstance.properties[prop] = value;
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
