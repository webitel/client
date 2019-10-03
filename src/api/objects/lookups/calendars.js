import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CalendarServiceApi} from 'webitel-sdk';

const calendarService = new CalendarServiceApi(configuration);

export async function getCalendars() {
    const domainId = store.getters.getDomainId || undefined;
    const response = await calendarService.searchCalendar(domainId, 20);
    console.log('get Calendars', response);

    return response.data.items;
}

export async function addCalendar(calendarToSend) {
    calendarToSend.domain_id = store.getters.getDomainId;
    // calendarToSend.domain_id = '2';
    console.log(calendarToSend);
    const response = await calendarService.createCalendar(calendarToSend);
    console.log(response);
}

export async function getCalendarTimezones() {
    const response = await calendarService.searchTimezones(20);
    return response.data.items;
}