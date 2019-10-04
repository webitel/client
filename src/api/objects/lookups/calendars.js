import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApi} from 'webitel-sdk';

const calendarService = new CalendarServiceApi(configuration);
const domainId = store.getters.getDomainId || undefined;

export async function getCalendarList() {
    const response = await calendarService.searchCalendar(domainId, 20);
    return response.data.items;
}

export async function addCalendar(calendarToSend) {
    calendarToSend.domain_id = domainId;
    const response = await calendarService.createCalendar(calendarToSend);
    console.log(response);
}

export async function getCalendarTimezones() {
    const response = await calendarService.searchTimezones(20);
    return response.data;
}

export async function getCalendar(id) {
    const response = await calendarService.readCalendar(id, domainId);

    const defaultCalendar = {
        name: '',
        timezone: '',
        description: '',
        startDate: '',
        endDate: ''
    };

    return Object.assign({}, defaultCalendar, response.data);
}

export async function updateCalendar(calendarToSend) {
    const response = await calendarService.updateCalendar(calendarToSend, calendarToSend.id);
    return response.data;
}

export async function deleteCalendar(id) {
    const response = await calendarService.deleteCalendar(id, domainId);
    return response.data;
}

export async function getWorkdayList(calendarId) {
    const response = await calendarService.searchAcceptOfDay(calendarId, domainId);
    return response.data;
}

export async function getWorkday(calendarId, workdayId) {
    const response = await calendarService.searchAcceptOfDay(calendarId, workdayId, domainId);
    return response.data;
}

export async function addWorkday(workday, calendarId) {
    console.log(workday);
    const response = await calendarService.createAcceptOfDay(workday, calendarId);
    return response.data;
}

export async function deleteWorkday(calendarId, workdayId) {
    const response = await calendarService.deleteAcceptOfDay(calendarId, workdayId, domainId);
    return response.data;
}

export async function updateWorkday(calendarId, workday) {
    const response = await calendarService.deleteAcceptOfDay(calendarId, workday.id, workday);
    return response.data;
}

export async function getHolidayList(calendarId) {
    const response = await calendarService.searchExceptDate(calendarId, domainId);
    return response.data;
}

export async function getHoliday(calendarId, holidayId) {
    const response = await calendarService.searchAcceptOfDay(calendarId, holidayId, domainId);
    return response.data;
}

export async function addHoliday(calendarId, holiday) {
    const response = await calendarService.createExceptDate(calendarId, holiday);
    return response.data;
}

export async function deleteHoliday(calendarId, holidayId) {
    const response = await calendarService.deleteAcceptOfDay(calendarId, holidayId, domainId);
    return response.data;
}

export async function updateHoliday(calendarId, holiday) {
    const response = await calendarService.deleteAcceptOfDay(calendarId, holiday.id, holiday);
    return response.data;
}
