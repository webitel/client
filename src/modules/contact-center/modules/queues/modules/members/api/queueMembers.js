import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import deepCopy from 'deep-copy';
import { MemberServiceApiFactory } from 'webitel-sdk';
// import {
//   SdkCreatorApiConsumer,
//   SdkDeleterApiConsumer,
//   SdkGetterApiConsumer,
//   SdkListGetterApiConsumer,
//   SdkPatcherApiConsumer,
//   SdkUpdaterApiConsumer,
// } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import sanitizer from '../../../../../../../app/api/old/utils/sanitizer';
import processing from '../store/_internals/queueSchema/defaults/processing';

const memberService = new MemberServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'queueId', 'name', 'priority', 'bucket', 'timezone', 'communications',
  'variables', 'expireAt', 'minOfferingAt', 'agent', 'stopCause',
];

const communicationsFieldsToSend = [
  'destination',
  'display',
  'priority',
  'type',
  'resource',
  'description',
  'dtmf',
];

const defaultSingleObjectCommunication = {
  destination: '',
  display: '',
  priority: 0,
  type: {},
  resource: {},
  description: '',
  dtmf: '',
};

const mapDefaultCommunications = (item) => (
  item.communications ? item.communications
                            .map((comm) => ({ ...defaultSingleObjectCommunication, ...comm })) : []
);

const _getMembersList = (getList) => function({
                                                page,
                                                size,
                                                search,
                                                sort,
                                                fields,
                                                id,
                                                parentId,
                                                from,
                                                to,
                                                bucket,
                                                priorityFrom,
                                                priorityTo,
                                                priority,
                                                cause,
                                                agent,
                                              }) {
  const params = [
    parentId, page, size, search, sort, fields, id, bucket,
    undefined, from, to, undefined, undefined, cause,
    priorityFrom || priority?.from, priorityTo || priority?.to,
    undefined, undefined, undefined, agent,
  ];

  return getList(params);
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

// const listGetter = new SdkListGetterApiConsumer(memberService.searchMemberInQueue,
// { defaultListObject, listResponseHandler }).setGetListMethod(_getMembersList);
const getMembersList = async (params) => {
  const defaultObject = {
    createdAt: 'unknown',
    priority: 0,
  };
const listHandler = (items) => {
  return items.map((item) => ({
    ...item,
    communications: mapDefaultCommunications(item),
  }));
};
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await memberService.searchMemberInQueue(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
        listHandler,
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
// const itemGetter = new SdkGetterApiConsumer(memberService.readMember,
// { defaultSingleObject, itemResponseHandler });
const getMember = async (queueId, id) => {
  const defaultObject = {
    createdAt: 'unknown',
      priority: '0',
      name: 'member',
      expireAt: 0,
      bucket: {},
      timezone: {},
      agent: {},
      communications: [],
      variables: [],
  };
  const responseHandler = (response) => {
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

  try {
    const response = await memberService.readMember(queueId, id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
// const itemCreator = new SdkCreatorApiConsumer(memberService.createMember,
// { fieldsToSend, preRequestHandler });
const addMember = async ({ queueId, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await memberService.createMember(queueId, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
// const itemUpdater = new SdkUpdaterApiConsumer(memberService.updateMember,
// { fieldsToSend, preRequestHandler });
const updateMember = async ({ itemInstance, itemId: id, queueId }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await memberService.updateMember(queueId, id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
// const itemDeleter = new SdkDeleterApiConsumer(memberService.deleteMember);
const deleteMember = async ({ queueId, id }) => {
  try {
    const response = await memberService.deleteMember(queueId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const resetMembersApiConsumer = new SdkPatcherApiConsumer(memberService.resetMembers);
const resetMembers = ({ parentId }) => resetMembersApiConsumer.patchItem({ id: parentId, changes: {} });

export const deleteMembersBulk = async (queueId, {
  search,
  id,
  from,
  to,
  bucket,
  priority,
  cause,
}) => {
  try {
    await memberService.deleteMembers(queueId, {
      id,
      q: search,
      createdAt: (from || to) ? { from, to } : undefined,
      priority,
      stopCause: cause,
      bucketId: bucket,
    });
  } catch (err) {
    throw err;
  }
};

const addMembersBulk = async (queueId, fileName, items) => {
  const itemsCopy = deepCopy(items);
  const body = { queueId, fileName, items: itemsCopy };
  try {
    await memberService.createMemberBulk(queueId, body);
    eventBus.$emit('notification', {
      type: 'info',
      text: 'Successfully added',
    });
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
  resetMembers,
};

export default QueueMembersAPI;
