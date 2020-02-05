import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {SkillServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const skillService = new SkillServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'description'];

export const getSkillsList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        name: '',
        _isSelected: false,
    };

    try {
        const response = await skillService.searchSkill(page, size, search, domainId);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getSkill = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        name: '',
        id: 0,
        _dirty: false,
    };

    try {
        const response = await skillService.readSkill(id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addSkill = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await skillService.createSkill(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateSkill = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await skillService.updateSkill(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteSkill = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await skillService.deleteSkill(id, domainId);
    } catch (err) {
        throw err;
    }
};