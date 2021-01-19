import { ResourceTeamServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import store from '../../../store/store';

const teamResService = new ResourceTeamServiceApiFactory(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['domainId', 'maxCapacity',
    'minCapacity', 'teamId', 'lvl', 'buckets', 'skill'];

export const getTeamSkillsList = async (teamId, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        buckets: [],
        lvl: 0,
        _isSelected: false,
    };

    try {
        const response = await teamResService
          .searchResourceTeamSkill(teamId, page, size, search, domainId);
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...defaultObject, ...item })),
                isNext: response.next || false,
            };
        }
        return { list: [] };
    } catch (err) {
        throw err;
    }
};

export const getTeamSkill = async (teamId, id) => {
    const { domainId } = store.state.userinfo;
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        buckets: [],
        lvl: 0,
        _dirty: false,
    };

    try {
        const response = await teamResService.readResourceTeamSkill(teamId, id, domainId);
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addTeamSkill = async (teamId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await teamResService.createResourceTeamSkill(teamId, itemCopy);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamSkill = async (teamId, id, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await teamResService.updateResourceTeamSkill(teamId, id, itemCopy);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
        throw err;
    }
};

export const deleteTeamSkill = async (teamId, id) => {
    const { domainId } = store.state.userinfo;
    try {
        await teamResService.deleteResourceTeamSkill(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};
