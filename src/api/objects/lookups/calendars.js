import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../sanitizer";

const calendarService = new CalendarServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'timezone', 'start', 'finish', 'week_day',
    'start_time_of_day', 'end_time_of_day', 'disabled', 'date', 'repeat'];

export const getCalendarList = async (size = 20) => {
    try {
        const response = await calendarService.searchCalendar(domainId, size);
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

        const defaultCalendar = {
            name: '',
            timezone: {},
            description: '',
            start: Date.now(),
            finish: Date.now(),
            expires: false,
        };

        return Object.assign({}, defaultCalendar, response.data);
    } catch (err) {
        throw err;
    }
};

export const getCalendarTimezones = async (page = 0, size = 20) => {
    try {
        const response = await calendarService.searchTimezones(page, size);
        return response.data;
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
        delete item.finish;
    }

    sanitizer(item, fieldsToSend);
    try {
        const response = await calendarService.createCalendar(item);
        console.log(response, response.data.id);
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateCalendar = async (calendarToSend) => {
    try {
        const response = await calendarService.updateCalendar(calendarToSend, calendarToSend.id);
        return response.data;
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
        const response = await calendarService.searchAcceptOfDay(calendarId, domainId);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(workday => {
                return {
                    day: workday.week_day || 0,
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
        const response = await calendarService.searchAcceptOfDay(calendarId, workdayId, domainId);
        return Array.isArray(response.data.items) ? response.data.items : [];
    } catch (err) {
        throw err;
    }
};

export const addWorkday = async (calendarId, item) => {
    item.week_day = item.day;
    item.start_time_of_day = item.start;
    item.end_time_of_day = item.end;

    sanitizer(item, fieldsToSend);
    item.calendar_id = calendarId;
    delete item.start;
    delete item.finish;
    try {
        const response = await calendarService.createAcceptOfDay(calendarId, item);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const updateWorkday = async (calendarId, workday) => {
    try {
        const response = await calendarService.deleteAcceptOfDay(calendarId, workday.id, workday);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const deleteWorkday = async (calendarId, workdayId) => {
    try {
        const response = await calendarService.deleteAcceptOfDay(calendarId, workdayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getHolidayList = async (calendarId) => {
    try {
        const response = await calendarService.searchExceptDate(calendarId, domainId);
        return Array.isArray(response.data.items) ? response.data.items : [];
    } catch (err) {
        throw err;
    }
};

export const getHoliday = async (calendarId, holidayId) => {
    try {
        const response = await calendarService.searchExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const addHoliday = async (calendarId, holiday) => {
    holiday.repeat = holiday.repeat ? 1 : 0;
    try {
        await calendarService.createExceptDate(calendarId, holiday);
    } catch (err) {
        throw err;
    }
};

export const updateHoliday = async (calendarId, holiday) => {
    try {
        await calendarService.updateExceptDate(calendarId, holiday.id, holiday);
    } catch (err) {
        throw err;
    }
}

export const deleteHoliday = async (calendarId, holidayId) => {
    try {
        const response = await calendarService.deleteExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};
