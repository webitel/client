import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {CalendarServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const calendarService = new CalendarServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/calendars';
const fieldsToSend = ['domainId', 'name', 'description', 'timezone', 'startAt', 'endAt', 'day',
    'accepts', 'excepts', 'startTimeOfDay', 'endTimeOfDay', 'disabled', 'date', 'repeat'];

const listGetter = new WebitelSDKListGetter(calendarService.searchCalendar);
const itemGetter = new WebitelSDKItemGetter(calendarService.readCalendar);
const timezoneGetter = new WebitelSDKListGetter(calendarService.searchTimezones);
const itemCreator = new WebitelSDKItemCreator(calendarService.createCalendar, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(calendarService.updateCalendar, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(calendarService.deleteCalendar);

itemGetter.responseHandler = (response) => {
    const defaultObject = {
        name: '',
        timezone: {},
        description: '',
        startAt: Date.now(),
        endAt: Date.now(),
        expires: !!(response.startAt || response.endAt),
        accepts: [],
        excepts: [],
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
};

timezoneGetter.responseHandler = (response) => {
    if (response.items) {
        return {
            list: response.items,
            next: response.next || false,
        };
    }
    return [];
};

export const getCalendarList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getCalendar = async (id) => {
    return await itemGetter.getItem(id);
};

export const getCalendarTimezones = async (page = 0, size = 20, search) => {
    let response = await timezoneGetter.getList({page, size, search});
    return response.list;
};

export const addCalendar = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
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
    return await itemCreator.createItem(itemCopy);
};


export const updateCalendar = async (itemId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
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
    return await itemUpdater.updateItem(itemId, itemCopy);
};

export const deleteCalendar = async (id) => {
    return await itemDeleter.deleteItem(id);
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