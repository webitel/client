import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {MemberServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const memberService = new MemberServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'priority', 'bucket', 'timezone', 'communications',
    'variables', 'expireAt'];

const communicationsFieldsToSend = ['destination', 'display', 'priority', 'type', 'resource', 'description'];

export const getMembersList = async (queueId, page = 0, size = 10) => {
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
        const response = await memberService.searchMember(queueId, page, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                item.communications = item.communications.map(comm => {
                    return {...defaultObjectCommunication, ...comm}
                });
                return {...defaultObject, ...objSnakeToCamel(item)};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getMember = async (queueId, id) => {
    try {
        let response = await memberService.readMember(queueId, id);
        const defaultObject = {
            destination: '',
            display: '',
            priority: '0',
            type: {},
            resource: {},
            _dirty: false,
        };
        response = response.data;
        if (response.variables) {
            response.variables = Object.keys(response.variables).map(key => {
                return {key, value: response.variables[key],}
            });
        } else {response.variables = [{key: '', value: ''}]}
        if(response.priority) response.priority+='';
        return {...defaultObject, ...objSnakeToCamel(response)};
    } catch (err) {
        throw err;
    }
};

export const addMember = async (queueId, item) => {
    let itemCopy = {...item, variables: {}};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.communications.forEach(item => sanitizer(item, communicationsFieldsToSend));
    itemCopy = objCamelToSnake(itemCopy);
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        const response = await memberService.createMember(queueId, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateMember = async (queueId, id, item) => {
    let itemCopy = {...item, variables: {}};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.communications.forEach(item => sanitizer(item, communicationsFieldsToSend));
    itemCopy = objCamelToSnake(itemCopy);
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        await memberService.updateMember(queueId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteMember = async (queueId, id) => {
    try {
        await memberService.deleteMember(queueId, id);
    } catch (err) {
        throw err;
    }
};