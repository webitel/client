import buckets from './queue-buckets';
import resGroups from './queue-res-groups';
import members from './queue-members';
import permissions from './permissions';
import {
    addQueue, deleteQueue, patchQueue,
    getQueue, getQueuesList, updateQueue
} from "../../../../api/contact-center/queues/queues";
import {DefaultModule} from "../../defaults/DefaultModule";
import proxy from "../../../../utils/editProxy";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            payload: {},
            ringtone: {},
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
        ringtone: {},
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [],
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
        variables: [],
        strategy: {},
        ringtone: {},
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
        variables: [],
        strategy: {},
        ringtone: {},
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
        variables: [],
        strategy: {},
        description: 'DESCRIPTION',

        timeout: 10,
        ringtone: {},
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
        variables: [],
        strategy: {},
        ringtone: {},
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
        variables: [],
        strategy: {},
        ringtone: {},
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

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    ...defaultModule.actions,

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

    SET_PAYLOAD_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_PAYLOAD_ITEM_PROPERTY', payload);
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

    SET_PAYLOAD_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance.payload[prop] = value;
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

    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {buckets, resGroups, members, permissions}
};
