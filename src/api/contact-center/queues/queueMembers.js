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
    'variables'];

export const getMembersList = async (queueId, page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await memberService.searchMember(queueId, page, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
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
            _dirty: false,
        };
        response = response.data;
        if (response.variables) {
            response.variables = Object.keys(response.variables).map(key => {
                return {key, value: response.profile[key],}
            });
        } else {
            response.variables = [{key: '', value: ''}];
        }
        return {...defaultObject, ...objSnakeToCamel(response)};
    } catch (err) {
        throw err;
    }
};

export const addMember = async (queueId, item) => {
    let itemCopy = {...item, variables: {}};
    sanitizer(itemCopy, fieldsToSend);
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