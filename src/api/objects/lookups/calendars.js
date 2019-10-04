import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApi, CalendarServiceApiFactory} from 'webitel-sdk';

const calendarService  = new CalendarServiceApiFactory
                (configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;

export async function getCalendarList() {
    try {
        const response = await calendarService.searchCalendar(domainId, 20);
        return response.data.items;
    } catch (err) {
        throw err;
    }
}

export async function addCalendar(calendarToSend) {
    calendarToSend.domain_id = domainId;
    try {
        const response = await calendarService.createCalendar(calendarToSend);
    } catch (err) {
        throw err;
    }
}

export async function getCalendarTimezones() {
    try {
        const response = await calendarService.searchTimezones(20);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getCalendar(id) {
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

export async function updateCalendar(calendarToSend) {
    try {
        const response = await calendarService.updateCalendar(calendarToSend, calendarToSend.id);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteCalendar(id) {
    try {
        const response = await calendarService.deleteCalendar(id, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getWorkdayList(calendarId) {
    try {
        const response = await calendarService.searchAcceptOfDay(calendarId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getWorkday(calendarId, workdayId) {
    try {
        const response = await calendarService.searchAcceptOfDay(calendarId, workdayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function addWorkday(workday, calendarId) {
    try {
        const response = await calendarService.createAcceptOfDay(workday, calendarId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteWorkday(calendarId, workdayId) {
    try {
        const response = await calendarService.deleteAcceptOfDay(calendarId, workdayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function updateWorkday(calendarId, workday) {
    try {
        const response = await calendarService.deleteAcceptOfDay(calendarId, workday.id, workday);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getHolidayList(calendarId) {
    try {
        const response = await calendarService.searchExceptDate(calendarId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getHoliday(calendarId, holidayId) {
    try {
        const response = await calendarService.searchExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function addHoliday(calendarId, holiday) {
    try {
        const response = await calendarService.createExceptDate(calendarId, holiday);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteHoliday(calendarId, holidayId) {
    try {
        const response = await calendarService.deleteExceptDate(calendarId, holidayId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function updateHoliday(calendarId, holiday) {
    try {
        const response = await calendarService.updateExceptDate(calendarId, holiday.id, holiday);
        return response.data;
    } catch (err) {
        throw err;
    }
}
