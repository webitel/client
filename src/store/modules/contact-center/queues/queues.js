import proxy from '../../../../utils/editProxy';
import buckets from './queue-buckets';
import resGroups from './queue-res-groups';
import members from './queue-members';
import permissions from './permissions';
import {
    addQueue, deleteQueue, patchQueue,
    getQueue, getQueuesList, updateQueue
} from "../../../../api/contact-center/queues/queues";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            payload: {},
            calendar: {},
            priority: 0,
            dncList: {},
            description: '',
            schema: {},
            team: {},
            strategy: {},
        },
    };
};

const defaultInboundQueueState = () => {
    return {
        name: 'INBOUND QUEUE',
        type: 1,
        payload: {},
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [{key: 'var key', value: 'value'}],
        description: 'DESCRIPTION',
    }
};

const defaultOutboundIVRQueueState = () => {
    return {
        name: 'OUTBOUND IVR QUEUE',
        type: 2,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        variables: [{key: 'var key', value: 'value'}],
        strategy: {},
        description: 'DESCRIPTION',
        timeout: 10,
        payload: {
            secBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            maxCalls: 10,
            maxOfRetry: 10,
        },
    }
};

const defaultOfflineQueueState = () => {
    return {
        name: 'OFFLINE QUEUE',
        type: 0,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [{key: 'var key', value: 'value'}],
        strategy: {},
        description: 'DESCRIPTION',
        timeout: 10,
        payload: {
            secBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxOfRetry: 10,
        },
    }
};

const defaultPredictiveDialerState = () => {
    return {
        name: 'PREDICTIVE DIALER',
        type: 5,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [{key: 'var key', value: 'value'}],
        strategy: {},
        description: 'DESCRIPTION',

        timeout: 10,
        payload: {
            secBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxOfRetry: 10,
        },
    }
};

const defaultPreviewDialerState = () => {
    return {
        name: 'PREVIEW DIALER',
        type: 3,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [{key: 'var key', value: 'value'}],
        strategy: {},
        description: 'DESCRIPTION',

        timeout: 10,
        payload: {
            secBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxOfRetry: 10,
        },
    }
};

const defaultProgressiveDialerState = () => {
    return {
        name: 'PROGRESSIVE DIALER',
        type: 4,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [{key: 'var key', value: 'value'}],
        strategy: {},
        description: 'DESCRIPTION',

        timeout: 10,
        payload: {
            secBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxOfRetry: 10,
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
        return await getQueuesList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getQueue(state.itemId);
    },

    POST_ITEM: async () => {
        return await addQueue(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        return await patchQueue(id, changes);
    },

    UPD_ITEM: async () => {
        await updateQueue(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteQueue(id);
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
            case 'inbound-queue':
                item = defaultInboundQueueState();
                break;
            case 'outbound-ivr':
                item = defaultOutboundIVRQueueState();
                break;
            case 'offline-queue':
                item = defaultOfflineQueueState();
                break;
            case 'preview-dialer':
                item = defaultPreviewDialerState();
                break;
            case 'predictive-dialer':
                item = defaultPredictiveDialerState();
                break;
            case 'progressive-dialer':
                item = defaultProgressiveDialerState();
                break;
        }
        context.commit('SET_ITEM', item);
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    SET_PAYLOAD_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_PAYLOAD_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if (!state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    TOGGLE_ITEM_PROPERTY: async (context, {index, prop}) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', {index, prop});
        let changes = {};
        changes[prop] = state.dataList[index][prop];
        try {
            await context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
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

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
        context.dispatch('ccenter/queues/buckets/RESET_ITEM_STATE', {}, {root: true});
        context.dispatch('ccenter/queues/resGroups/RESET_ITEM_STATE', {}, {root: true});
        context.dispatch('ccenter/queues/members/RESET_ITEM_STATE', {}, {root: true});
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

    SET_PAYLOAD_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance.payload[prop] = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, {index, prop}) => {
        state.dataList[index][prop] = !state.dataList[index][prop];
    },

    SET_ITEM: (state, item) => {
        state.itemInstance = item;
    },

    REMOVE_ITEM: (state, index) => {
        state.dataList.splice(index, 1);
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
    modules: {buckets, resGroups, members, permissions}
};
