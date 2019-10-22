import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApi, CalendarServiceApiFactory} from 'webitel-sdk';

const calendarService  = new CalendarServiceApiFactory
                (configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;

export const getCalendarList = async () => {
    try {
        const response = await calendarService.searchCalendar(domainId, 20);
        if(!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item.isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
}

export const addCalendar = async (calendarToSend) => {
    calendarToSend.domain_id = domainId;
    try {
        const response = await calendarService.createCalendar(calendarToSend);
    } catch (err) {
        throw err;
    }
}

export const getCalendarTimezones = async () => {
    try {
        const response = await calendarService.searchTimezones(20);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getCalendar = async (id) => {
    try {
        const response = await calendarService.readCalendar(id, domainId);

        const defaultCalendar = {
            name: '',
            timezone: '',
            description: '',
            startDate: '',
            endDate: ''
        };

        return Object.assign({}, defaultCalendar, response.data);
    } catch (err) {
        throw err;
    }
}

export const updateCalendar = async (calendarToSend) => {
    try {
        const response = await calendarService.updateCalendar(calendarToSend, calendarToSend.id);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteCalendar = async (id) => {
    try {
        const response = await calendarService.deleteCalendar(id, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getWorkdayList = async (calendarId) => {
    try {
        const response = await calendarService.searchAcceptOfDay(calendarId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getWorkday = async (calendarId, workdayId) => {
    try {
        const response = await calendarService.searchAcceptOfDay(calendarId, workdayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const addWorkday = async (workday, calendarId) => {
    try {
        const response = await calendarService.createAcceptOfDay(workday, calendarId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteWorkday = async (calendarId, workdayId) => {
    try {
        const response = await calendarService.deleteAcceptOfDay(calendarId, workdayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const updateWorkday = async (calendarId, workday) => {
    try {
        const response = await calendarService.deleteAcceptOfDay(calendarId, workday.id, workday);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getHolidayList = async (calendarId) => {
    try {
        const response = await calendarService.searchExceptDate(calendarId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getHoliday = async (calendarId, holidayId) => {
    try {
        const response = await calendarService.searchExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const addHoliday = async (calendarId, holiday) => {
    try {
        const response = await calendarService.createExceptDate(calendarId, holiday);
        return response.data;
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
}

export const updateHoliday = async (calendarId, holiday) => {
    try {
        const response = await calendarService.updateExceptDate(calendarId, holiday.id, holiday);
        return response.data;
    } catch (err) {
        throw err;
    }
}
