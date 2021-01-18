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
            doSchema:{},
            team: {},
            strategy: {},
        },
    };
};

const defaultInboundQueueState = () => {
    return {
        name: '',
        type: 1,
        payload: {
            maxWaitTime: 5 * 60,
            timeoutWithNoAgents: '',
            timeBaseScore: '',
            discardAbandonedAfter: '',
        },
        ringtone: {},
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [],
        description: '',
    }
};

const defaultOutboundIVRQueueState = () => {
    return {
        name: '',
        type: 2,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        variables: [],
        strategy: {},
        ringtone: {},
        description: '',
        timeout: 10,
        payload: {
            secBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            maxCalls: 10,
            maxAttempts: 10,
            minDuration: 5,
            recordings: false,
            amd: {
                enabled: false,
                allowNotSure: false,
                maxWordLength: 5000,
                maxNumberOfWords: 3,
                betweenWordsSilence: 50,
                minWordLength: 100,
                totalAnalysisTime: 5000,
                silenceThreshold: 256,
                afterGreetingSilence: 800,
                greeting: 1500,
                initialSilence: 2500,
            },
        },
    }
};

const defaultOfflineQueueState = () => {
    return {
        name: '',
        type: 0,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [],
        strategy: {},
        ringtone: {},
        description: '',
        timeout: 10,
        payload: {
            waitBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxAttempts: 10,
            recordings: false,
        },
    }
};

const defaultPredictiveDialerState = () => {
    return {
        name: '',
        type: 5,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [],
        strategy: {},
        description: '',

        timeout: 10,
        ringtone: {},
        payload: {
            waitBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxAttempts: 10,
            recordings: false,
            amd: {
                enabled: false,
                allowNotSure: false,
                maxWordLength: 5000,
                maxNumberOfWords: 3,
                betweenWordsSilence: 50,
                minWordLength: 100,
                totalAnalysisTime: 5000,
                silenceThreshold: 256,
                afterGreetingSilence: 800,
                greeting: 1500,
                initialSilence: 2500
            },
        },
    }
};

const defaultPreviewDialerState = () => {
    return {
        name: '',
        type: 3,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [],
        strategy: {},
        ringtone: {},
        description: '',

        timeout: 10,
        payload: {
            waitBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxAttempts: 10,
            recordings: false,
        },
    }
};

const defaultProgressiveDialerState = () => {
    return {
        name: '',
        type: 4,
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        variables: [],
        strategy: {},
        ringtone: {},
        doSchema: {},
        description: '',

        timeout: 10,
        payload: {
            waitBetweenRetries: 30 * 3600, //30h
            originateTimeout: 15,
            waitForResultStatus: true,
            maxAttempts: 10,
            minDuration: 5,
            allowGreetingAgent: false,
            recordings: false,
            amd: {
                enabled: false,
                allowNotSure: false,                
                maxWordLength: 5000,
                maxNumberOfWords: 3,
                betweenWordsSilence: 50,
                minWordLength: 100,
                totalAnalysisTime: 5000,
                silenceThreshold: 256,
                afterGreetingSilence: 800,
                greeting: 1500,
                initialSilence: 2500
            },
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

    GET_LIST: (context) => {
        return getQueuesList(context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: (context) => {
        return getQueue(context.state.itemId);
    },

    POST_ITEM: (context) => {
        return addQueue(context.state.itemInstance);
    },

    PATCH_ITEM: (context, { id, changes }) => {
        return patchQueue(id, changes);
    },

    UPD_ITEM: (context) => {
        return updateQueue(context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: (context, id) => {
        return deleteQueue(id);
    },

    LOAD_ITEM: async (context, type) => {
        if (context.state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            context.dispatch('SET_TYPED_ITEM', {type: type, item: proxy(item)});
        } else {
            context.dispatch('SET_ITEM_BY_TYPE', type);
        }
    },

    SET_TYPED_ITEM: (context, {type, item}) => {
        switch (type) {
            case 'inbound-queue':
                item = Object.assign(defaultInboundQueueState(), item);
                break;
            case 'outbound-ivr':
                item = Object.assign(defaultOutboundIVRQueueState(), item);
                break;
            case 'offline-queue':
                item = Object.assign(defaultOfflineQueueState(), item);
                break;
            case 'preview-dialer':
                item = Object.assign(defaultPreviewDialerState(), item);
                break;
            case 'predictive-dialer':
                item = Object.assign(defaultPredictiveDialerState(), item);
                break;
            case 'progressive-dialer':
                item = Object.assign(defaultProgressiveDialerState(), item);
                break;
        }
        context.commit('SET_ITEM', proxy(item));
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

    SET_ITEM_PAYLOAD_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PAYLOAD_PROPERTY', payload);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    SET_AMD_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_AMD_ITEM_PROPERTY', payload);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
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
        context.dispatch('ccenter/queues/buckets/RESET_STATE', {}, {root: true});
        context.dispatch('ccenter/queues/resGroups/RESET_STATE', {}, {root: true});
        context.dispatch('ccenter/queues/members/RESET_STATE', {}, {root: true});
    },
};

const mutations = {

    SET_ITEM_PAYLOAD_PROPERTY: (state, {prop, value}) => {
        state.itemInstance.payload[prop] = value;
    },

    SET_AMD_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance.payload.amd[prop] = value;
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
