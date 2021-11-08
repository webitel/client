import { CalendarServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const calendarService = new CalendarServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description', 'timezone', 'startAt', 'endAt', 'day',
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

const itemResponseHandler = (response) => {
  const defaultSingleObject = {
    name: '',
    timezone: {},
    description: '',
    startAt: Date.now(),
    endAt: Date.now(),
    expires: !!(response.startAt || response.endAt),
    accepts: [],
    excepts: [],
  };
  // eslint-disable-next-line no-param-reassign
  response.accepts = response.accepts.map((accept) => ({
    day: accept.day || 0,
    disabled: accept.disabled || false,
    start: accept.startTimeOfDay || 0,
    end: accept.endTimeOfDay || 0,
  }));
  if (response.excepts) {
    // eslint-disable-next-line no-param-reassign
    response.excepts = response.excepts.map((except) => ({
      name: except.name || '',
      date: except.date || 0,
      repeat: except.repeat || false,
    }));
  }
  return { ...defaultSingleObject, ...response };
};

const listGetter = new SdkListGetterApiConsumer(calendarService.searchCalendar);
const itemGetter = new SdkGetterApiConsumer(calendarService.readCalendar, { itemResponseHandler });
const timezoneGetter = new SdkListGetterApiConsumer(calendarService.searchTimezones);
const itemCreator = new SdkCreatorApiConsumer(calendarService.createCalendar,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(calendarService.updateCalendar,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(calendarService.deleteCalendar);

export const getCalendarList = (params) => listGetter.getList(params);
export const getCalendar = (params) => itemGetter.getItem(params);
export const getCalendarTimezones = async (params) => {
  const response = await timezoneGetter.getList(params);
  return response.list;
};
export const addCalendar = (params) => itemCreator.createItem(params);
export const updateCalendar = (params) => itemUpdater.updateItem(params);
export const deleteCalendar = (params) => itemDeleter.deleteItem(params);
const getCalendarsLookup = (params) => listGetter.getLookup(params);

export default {
  getList: getCalendarList,
  get: getCalendar,
  add: addCalendar,
  update: updateCalendar,
  delete: deleteCalendar,
  getLookup: getCalendarsLookup,
};
