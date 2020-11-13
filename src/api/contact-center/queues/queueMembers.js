import { MemberServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import store from '../../../store/store';

const memberService = new MemberServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'queueId', 'name', 'priority', 'bucket', 'skill', 'timezone', 'communications',
    'variables', 'expireAt'];


const communicationsFieldsToSend = ['destination', 'display', 'priority', 'type', 'resource', 'description'];

export const getMembersList = async (queueId, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
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
        const response = await memberService.searchMemberInQueue(queueId, page, size, domainId);
        if (response.items) {
            return {
                list: response.items.map((item) => {
                    item.communications = item.communications.map((comm) => ({ ...defaultObjectCommunication, ...comm }));
                    return { ...defaultObject, ...item };
                }),
                isNext: response.next || false,
            }
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getMember = async (queueId, id) => {
    const { domainId } = store.state.userinfo;

    const defaultObject = {
        createdAt: 'unknown',
        priority: '0',
        name: 'member',
        expireAt: 0,
        skill: {},
        bucket: {},
        timezone: {},
        communications: [],
        variables: [],
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
        const response = await memberService.readMember(queueId, id, domainId);
        if (response.variables) {
            response.variables = Object.keys(response.variables).map((key) => ({ key, value: response.variables[key] }));
        }
        if (response.priority) response.priority += '';
        response.communications = response.communications.map((comm) => ({ ...defaultObjectCommunication, ...comm }));
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addMember = async (queueId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.variables = {};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.communications.forEach((item) => sanitizer(item, communicationsFieldsToSend));
    item.variables.forEach((variable) => {
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
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.variables = {};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.communications.forEach((item) => sanitizer(item, communicationsFieldsToSend));
    item.variables.forEach((variable) => {
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
    const { domainId } = store.state.userinfo;
    try {
        await memberService.deleteMember(queueId, id, domainId);
    } catch (err) {
        throw err;
    }
};

export const deleteMembers = async (queueId, ids) => {
    const { domainId } = store.state.userinfo;
    try {
        await memberService.deleteMembers(queueId, { ids }, domainId);
    } catch (err) {
        throw err;
    }
};

export const addMembersList = async (queueId, items) => {
    const { domainId } = store.state.userinfo;
    const itemsCopy = deepCopy(items);
    const body = { queueId, items: itemsCopy, domainId };
    try {
        await memberService.createMemberBulk(queueId, body);
        eventBus.$emit('notificationInfo', 'Successfully added');
    } catch (err) {
        throw err;
    }
};
