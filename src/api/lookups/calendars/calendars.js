import { CalendarServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';

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
  return { ...defaultObject, ...response };
};

const listGetter = new SDKListGetter(calendarService.searchCalendar);
const itemGetter = new SDKItemGetter(calendarService.readCalendar,
  null, itemResponseHandler);
const timezoneGetter = new SDKListGetter(calendarService.searchTimezones);
const itemCreator = new SDKItemCreator(calendarService.createCalendar,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKItemUpdater(calendarService.updateCalendar,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKItemDeleter(calendarService.deleteCalendar);

export const getCalendarList = (params) => listGetter.getList(params);
export const getCalendar = ({ itemId }) => itemGetter.getItem(itemId);
export const getCalendarTimezones = async (params) => {
  const response = await timezoneGetter.getList(params);
  return response.list;
};
export const addCalendar = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateCalendar = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteCalendar = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getCalendarList,
  get: getCalendar,
  add: addCalendar,
  update: updateCalendar,
  delete: deleteCalendar,
};
