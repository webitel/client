import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {CalendarServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const calendarService = new CalendarServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/calendars';
const fieldsToSend = ['domainId', 'name', 'description', 'timezone', 'startAt', 'endAt', 'day',
    'accepts', 'excepts', 'startTimeOfDay', 'endTimeOfDay', 'disabled', 'date', 'repeat'];

export const getCalendarList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await calendarService.searchCalendar(page, size, search, domainId);
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

export const getCalendar = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;

    try {
        let response = await calendarService.readCalendar(id, domainId);
        const defaultObject = {
            name: '',
            timezone: {},
            description: '',
            startAt: Date.now(),
            endAt: Date.now(),
            expires: !!(response.startAt || response.endAt),
            _dirty: false,
        };
        response.accepts = response.accepts.map(accept => {
            return {
                day: accept.day || 0,
                disabled: accept.disabled || false,
                start: accept.startTimeOfDay || 0,
                end: accept.endTimeOfDay || 0
            }
        });
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const getCalendarTimezones = async (page = 0, size = 20, search) => {
    if (search && search.slice(-1) !== '*') search += '*';
    if (search && search.slice(0) !== '*') search = '*' + search;
    try {
        const response = await calendarService.searchTimezones(page, size, search);
        return response.items;
    } catch (err) {
        throw err;
    }
};

export const addCalendar = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    delete itemCopy.timezone.offset;
    if (!itemCopy.expires) {
        delete itemCopy.startAt;
        delete itemCopy.endAt;
    }

    itemCopy.accepts = itemCopy.accepts.map(accept => {
        return {
            day: accept.day,
            disabled: accept.disabled,
            startTimeOfDay: accept.start,
            endTimeOfDay: accept.end
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await calendarService.createCalendar(itemCopy);
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateCalendar = async (itemId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    delete itemCopy.timezone.offset;
    if (!itemCopy.expires) {
        delete itemCopy.startAt;
        delete itemCopy.endAt;
    }

    itemCopy.accepts = itemCopy.accepts.map(accept => {
        return {
            day: accept.day,
            disabled: accept.disabled,
            startTimeOfDay: accept.start,
            endTimeOfDay: accept.end
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        await calendarService.updateCalendar(itemId, itemCopy);
    } catch (err) {
        throw err;
    }
};

export const deleteCalendar = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await calendarService.deleteCalendar(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getCalendarPermissions = async (id, page = 0, size = 10, search) => {
    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + '/' + id + '/acl' + `?size=${size}`;
    if (search) url += `&name=${search}*`;
    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchCalendarPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};