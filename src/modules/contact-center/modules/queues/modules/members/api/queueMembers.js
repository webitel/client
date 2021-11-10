import { MemberServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import sanitizer from '../../../../../../../app/api/utils/sanitizer';

const memberService = new MemberServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['queueId', 'name', 'priority', 'bucket', 'timezone', 'communications',
  'variables', 'expireAt', 'minOfferingAt'];

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
    item.communications ? item.communications.map((comm) => ({ ...defaultSingleObjectCommunication, ...comm })) : []
);

const _getMembersList = (getList) => function ({
                                                 page,
                                                 size,
                                                 // search,
                                                 // sort,
                                                 parentId,
                                               }) {
  const params = [parentId, page, size];
  return getList(params);
};

const listResponseHandler = (response) => {
  const items = response.items.map((item) => ({
    ...item,
    communications: mapDefaultCommunications(item),
  }));
  return { items, next: response.next };
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

const listGetter = new SdkListGetterApiConsumer(memberService.searchMemberInQueue,
  { defaultListObject, listResponseHandler })
  .setGetListMethod(_getMembersList);
const itemGetter = new SdkGetterApiConsumer(memberService.readMember,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SdkCreatorApiConsumer(memberService.createMember,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(memberService.updateMember,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(memberService.deleteMember);

const getMembersList = (params) => listGetter.getList(params);
const getMember = (params) => itemGetter.getNestedItem(params);
const addMember = (params) => itemCreator.createNestedItem(params);
const updateMember = (params) => itemUpdater.updateNestedItem(params);
const deleteMember = (params) => itemDeleter.deleteNestedItem(params);

export const deleteMembersBulk = async (queueId, ids) => {
  try {
    await memberService.deleteMembers(queueId, { ids });
  } catch (err) {
    throw err;
  }
};

const addMembersBulk = async (queueId, items) => {
  const itemsCopy = deepCopy(items);
  const body = { queueId, items: itemsCopy };
  try {
    await memberService.createMemberBulk(queueId, body);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
  } catch (err) {
    throw err;
  }
};

const QueueMembersAPI = {
  getList: getMembersList,
  get: getMember,
  add: addMember,
  addBulk: addMembersBulk,
  update: updateMember,
  delete: deleteMember,
  deleteBulk: deleteMembersBulk,
};

export default QueueMembersAPI;
