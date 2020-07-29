import { CalendarServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import WebitelAPIPermissionsGetter from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';


const calendarService = new CalendarServiceApiFactory(configuration, '', instance);

const BASE_URL = '/calendars';
const fieldsToSend = ['domainId', 'name', 'description', 'timezone', 'startAt', 'endAt', 'day',
    'accepts', 'excepts', 'startTimeOfDay', 'endTimeOfDay', 'disabled', 'date', 'repeat'];

const preRequestHandler = (item) => {
    delete item.timezone.offset;
    if (!item.expires) {
        delete item.startAt;
        delete item.endAt;
    }

    item.accepts = item.accepts.map((accept) => ({
            day: accept.day,
            disabled: accept.disabled,
            startTimeOfDay: accept.start,
            endTimeOfDay: accept.end,
        }));
    return item;
};

const listGetter = new WebitelSDKListGetter(calendarService.searchCalendar);
const itemGetter = new WebitelSDKItemGetter(calendarService.readCalendar);
const timezoneGetter = new WebitelSDKListGetter(calendarService.searchTimezones);
const itemCreator = new WebitelSDKItemCreator(calendarService.createCalendar, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(calendarService.updateCalendar, fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelSDKItemDeleter(calendarService.deleteCalendar);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

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
    response.accepts = response.accepts.map((accept) => ({
            day: accept.day || 0,
            disabled: accept.disabled || false,
            start: accept.startTimeOfDay || 0,
            end: accept.endTimeOfDay || 0,
        }));
    return { ...defaultObject, ...response };
};

timezoneGetter.responseHandler = (response) => {
    if (response.items) {
        return {
            list: response.items,
        };
    }
    return [];
};

export const getCalendarList = async (page = 0, size = 10, search) => await listGetter.getList({ page, size, search });

export const getCalendar = async (id) => await itemGetter.getItem(id);

export const getCalendarTimezones = async (page = 0, size = 20, search) => {
    const response = await timezoneGetter.getList({ page, size, search });
    return response.list;
};

export const addCalendar = async (item) => await itemCreator.createItem(item);

export const updateCalendar = async (itemId, item) => await itemUpdater.updateItem(itemId, item);

export const deleteCalendar = async (id) => await itemDeleter.deleteItem(id);

export const getCalendarPermissions = async (id, page = 0, size = 10, search) => await permissionsGetter.getList(id, size, search);

export const patchCalendarPermissions = async (id, item) => await permissionsPatcher.patchItem(id, item);
