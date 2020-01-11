import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../utils/sanitizer";
import {objSnakeToCamel, objCamelToSnake} from "../utils/caseConverters";

const calendarService = new CalendarServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'timezone', 'start', 'end', 'day',
    'start_time_of_day', 'end_time_of_day', 'disabled', 'date', 'repeat'];

export const getCalendarList = async (page = 0, size = 20) => {
    try {
        const response = await calendarService.searchCalendar(page, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item.isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getCalendar = async (id) => {
    try {
        const response = await calendarService.readCalendar(id, domainId);

        const defaultObject = {
            name: '',
            timezone: {},
            description: '',
            start: Date.now(),
            end: Date.now(),
            expires: !!(response.data.start || response.data.end),
        };

        return Object.assign({}, defaultObject, response.data);
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
    item.domain_id = domainId;
    //FIXME: DELETE OFFSET FROM TIMEZONE RESPONSE
    delete item.timezone.offset;
    if (!item.expires) {
        delete item.start;
        delete item.end;
    }

    sanitizer(item, fieldsToSend);
    try {
        const response = await calendarService.createCalendar(item);
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateCalendar = async (itemId, item) => {
    if (!item.expires) {
        delete item.start;
        delete item.end;
    }

    sanitizer(item, fieldsToSend);
    try {
        await calendarService.updateCalendar(itemId, item);
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

export const getWorkdayList = async (calendarId) => {
    try {
        console.log(calendarId);
        const response = await calendarService.searchAcceptOfDay(calendarId, domainId);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(workday => {
                return {
                    day: workday.day || 0,
                    id: workday.id,
                    enabled: !workday.disabled,
                    start: workday.start_time_of_day || 0,
                    end: workday.end_time_of_day || 1440,
                }
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getWorkday = async (calendarId, workdayId) => {
    try {
        const response = await calendarService.readAcceptOfDay(calendarId, workdayId, domainId);
        return Array.isArray(response.data.items) ? response.data.items : [];
    } catch (err) {
        throw err;
    }
};

export const addWorkday = async (calendarId, item) => {
    item.start_time_of_day = item.start;
    item.end_time_of_day = item.end;
    item.disabled = !item.enabled;

    sanitizer(item, fieldsToSend);
    item.calendar_id = calendarId;
    delete item.start;
    delete item.end;
    try {
        const response = await calendarService.createAcceptOfDay(calendarId, item);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const updateWorkday = async (calendarId, itemId, item) => {
    item.start_time_of_day = item.start;
    item.end_time_of_day = item.end;
    item.disabled = !item.enabled;

    sanitizer(item, fieldsToSend);
    item.calendar_id = calendarId;
    delete item.start;
    delete item.end;
    try {
        const response = await calendarService.updateAcceptOfDay(calendarId, itemId, item);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const deleteWorkday = async (calendarId, workdayId) => {
    try {
        await calendarService.deleteAcceptOfDay(calendarId, workdayId, domainId);
    } catch (err) {
        throw err;
    }
};

export const getHolidayList = async (calendarId) => {
    try {
        const response = await calendarService.searchExceptDate(calendarId, domainId);
        return response.data.items ? response.data.items : [];
    } catch (err) {
        throw err;
    }
};

export const getHoliday = async (calendarId, holidayId) => {
    try {
        const response = await calendarService.readExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const addHoliday = async (calendarId, item) => {
    try {
        await calendarService.createExceptDate(calendarId, item);
    } catch (err) {
        throw err;
    }
};

export const updateHoliday = async (calendarId, itemId, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await calendarService.updateExceptDate(calendarId, itemId, item);
    } catch (err) {
        throw err;
    }
};

export const deleteHoliday = async (calendarId, holidayId) => {
    try {
        const response = await calendarService.deleteExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};
