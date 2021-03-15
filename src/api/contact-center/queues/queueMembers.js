import { MemberServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const memberService = new MemberServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['queueId', 'name', 'priority', 'bucket', 'timezone', 'communications',
  'variables', 'expireAt'];

const communicationsFieldsToSend = ['destination', 'display', 'priority', 'type', 'resource', 'description'];

const defaultListObject = {
  createdAt: 'unknown',
  priority: 0,
};

const defaultSingleObject = {
  createdAt: 'unknown',
  priority: '0',
  name: 'member',
  expireAt: 0,
  bucket: {},
  timezone: {},
  communications: [],
  variables: [],
};

const defaultSingleObjectCommunication = {
  destination: '',
  display: '',
  priority: 0,
  type: {},
  resource: {},
  description: '',
};

const mapDefaultCommunications = (item) => (
  item.communications.map((comm) => ({ ...defaultSingleObjectCommunication, ...comm }))
);

const _getMembersList = (getList) => function ({
                                                 page,
                                                 size,
                                                 parentId,
                                               }) {
  const params = [parentId, page, size];
  return getList(params);
};

const listResponseHandler = (response) => {
  const list = response.list.map((item) => ({
    ...item,
    communications: mapDefaultCommunications(item),
  }));
  return { list, next: response.next };
};

const itemResponseHandler = (response) => {
  let variables = [];
  if (response.variables) {
    variables = Object.keys(response.variables).map((key) => ({
      key,
      value: response.variables[key],
    }));
  }
  const communications = mapDefaultCommunications(response);
  return { ...response, variables, communications };
};

const preRequestHandler = (item) => {
  item.communications
    .forEach((item) => sanitizer(item, communicationsFieldsToSend));
  const variables = item.variables.reduce((variables, variable) => ({
    ...variables,
    [variable.key]: variable.value,
  }), {});
  return { ...item, variables };
};

const listGetter = new SDKListGetter(memberService.searchMemberInQueue,
  { defaultListObject, listResponseHandler })
  .setGetListMethod(_getMembersList);
const itemGetter = new SDKGetter(memberService.readMember,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SDKCreator(memberService.createMember,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(memberService.updateMember,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKDeleter(memberService.deleteMember);

export const getMembersList = (params) => listGetter.getList(params);
export const getMember = (params) => itemGetter.getNestedItem(params);
export const addMember = (params) => itemCreator.createNestedItem(params);
export const updateMember = (params) => itemUpdater.updateNestedItem(params);
export const deleteMember = (params) => itemDeleter.deleteNestedItem(params);

export const deleteMembers = async (queueId, ids) => {
  try {
    await memberService.deleteMembers(queueId, { ids });
  } catch (err) {
    throw err;
  }
};

export const addMembersList = async (queueId, items) => {
  const itemsCopy = deepCopy(items);
  const body = { queueId, items: itemsCopy };
  try {
    await memberService.createMemberBulk(queueId, body);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
  } catch (err) {
    throw err;
  }
};

export default {
  getList: getMembersList,
  get: getMember,
  add: addMember,
  update: updateMember,
  delete: deleteMember,
};
