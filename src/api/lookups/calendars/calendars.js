import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import {objSnakeToCamel, objCamelToSnake} from "../../utils/caseConverters";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import eventBus from "../../../utils/eventBus";

const calendarService = new CalendarServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/calendars';
const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'timezone', 'startAt', 'endAt', 'day',
    'accepts', 'excepts', 'startTimeOfDay', 'endTimeOfDay', 'disabled', 'date', 'repeat'];

export const getCalendarList = async (page = 0, size = 20) => {
    try {
        const response = await calendarService.searchCalendar(page, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getCalendar = async (id) => {

    try {
        let response = await calendarService.readCalendar(id, domainId);

        const defaultObject = {
            name: '',
            timezone: {},
            description: '',
            startAt: 1010,
            endAt: 1010,
            expires: !!(response.data.start_at || response.data.end_at),
            _dirty: false,
        };

        response.data.accepts = response.data.accepts.map(accept => {
            return {
                day: accept.day || 0,
                disabled: accept.disabled || false,
                start: accept.start_time_of_day || 0,
                end: accept.end_time_of_day || 0
            }
        });
        response = objSnakeToCamel(response.data);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const getCalendarTimezones = async (page = 0, size = 20) => {
    try {
        const response = await calendarService.searchTimezones(page, size);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const addCalendar = async (item) => {
    let itemCopy = {...item};
    delete itemCopy.timezone.offset;
    if (!itemCopy.expires) {
        delete itemCopy.startAt;
        delete itemCopy.endAt;
    }

    itemCopy.accepts = itemCopy.accepts.map(accept => {
        return {
            day: accept.day,
            disabled: accept.disabled,
            start_time_of_day: accept.start,
            end_time_of_day: accept.end
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await calendarService.createCalendar(objCamelToSnake(itemCopy));
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateCalendar = async (itemId, item) => {
    let itemCopy = {...item};
    delete itemCopy.timezone.offset;
    if (!itemCopy.expires) {
        delete itemCopy.startAt;
        delete itemCopy.endAt;
    }

    itemCopy.accepts = itemCopy.accepts.map(accept => {
        return {
            day: accept.day,
            disabled: accept.disabled,
            start_time_of_day: accept.start,
            end_time_of_day: accept.end
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        await calendarService.updateCalendar(itemId, objCamelToSnake(itemCopy));
    } catch (err) {
        throw err;
    }
};

export const deleteCalendar = async (id) => {
    try {
        const response = await calendarService.deleteCalendar(id, domainId);
        return response.data;
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