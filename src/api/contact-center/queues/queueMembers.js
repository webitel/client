import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {MemberServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const memberService = new MemberServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'queueId', 'name', 'priority', 'bucket', 'timezone', 'communications',
    'variables', 'expireAt'];

const communicationsFieldsToSend = ['destination', 'display', 'priority', 'type', 'resource', 'description'];

export const getMembersList = async (queueId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        createdAt: 'unknown',
        priority: '0',
        _isSelected: false,
    };

    const defaultObjectCommunication = {
        destination: '',
        display: '',
        priority: 0,
        type: {},
        resource: {},
        description: '',
    };

    try {
        const response = await memberService.searchMember(queueId, page, size, domainId);
        if (response.items) {
            return response.items.map(item => {
                item.communications = item.communications.map(comm => {
                    return {...defaultObjectCommunication, ...comm}
                });
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getMember = async (queueId, id) => {
    const domainId = store.state.userinfo.domainId;

    const defaultObject = {
        createdAt: 'unknown',
        priority: '0',
        _isSelected: false,
        _dirty: false,
    };

    const defaultObjectCommunication = {
        destination: '',
        display: '',
        priority: 0,
        type: {},
        resource: {},
        description: '',
    };

    try {
        let response = await memberService.readMember(queueId, id, domainId);
        if (response.variables) {
            response.variables = Object.keys(response.variables).map(key => {
                return {key, value: response.variables[key],}
            });
        }
        if (response.priority) response.priority += '';
        response.communications = response.communications.map(comm => {
            return {...defaultObjectCommunication, ...comm}
        });
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addMember = async (queueId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.variables = {};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.communications.forEach(item => sanitizer(item, communicationsFieldsToSend));
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        const response = await memberService.createMember(queueId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateMember = async (queueId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.variables = {};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.communications.forEach(item => sanitizer(item, communicationsFieldsToSend));
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        await memberService.updateMember(queueId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteMember = async (queueId, id) => {
    const domainId = store.state.userinfo.domainId;
    try {
        await memberService.deleteMember(queueId, id, domainId);
    } catch (err) {
        throw err;
    }
};

export const addMembersList = async (queueId, items) => {
    const domainId = store.state.userinfo.domainId;
    let itemsCopy = deepCopy(items);
    let body = {queueId, items: itemsCopy, domainId};
    try {
        await memberService.createMemberBulk(queueId, body);
        eventBus.$emit('notificationInfo', 'Successfully added');
    } catch (err) {
        throw err;
    }
};