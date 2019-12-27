import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../../api/sanitizer';
import {SkillServiceApiFactory} from 'webitel-sdk';

const skillService = new SkillServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description'];

export const getSkillsList = async (size = 10) => {
    const defaultObject = {
        _isSelected: false,
        name: '',
    };

    try {
        const response = await skillService.searchSkill(domainId, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return Object.assign({}, defaultObject, item);
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getSkill = async (id) => {
    try {
        const response = await skillService.readSkill(id, domainId);
        const defaultObject = {
            name: '',
            id: 0,
            _dirty: false,
        };

        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addSkill = async (item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await skillService.createSkill(item);
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateSkill = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await skillService.updateSkill(id, item);
    } catch (err) {
        throw err;
    }
};

export const deleteSkill = async (id) => {
    try {
        await skillService.deleteSkill(id, domainId);
    } catch (err) {
        throw err;
    }
};