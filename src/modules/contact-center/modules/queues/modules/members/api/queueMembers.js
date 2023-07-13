import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import deepCopy from 'deep-copy';
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
// import sanitizer from '../../../../../../../app/api/old/utils/sanitizer';

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
  .forEach((item) => sanitizer(item, communicationsFieldsToSend)); //переробити на аплій трансформ? подивитись, як працює новий санітайс
  const variables = item.variables.reduce((variables, variable) => ({
    ...variables,
    [variable.key]: variable.value,
  }), {});
  return { ...item, variables };
};

// const listGetter = new SdkListGetterApiConsumer(
//   memberService.searchMemberInQueue,
//   { defaultListObject, listResponseHandler },
// )
// .setGetListMethod(_getMembersList);
const getMembersList = async (params) => {
  const fieldsToSend = ['page', 'size', 'search', 'sort', 'fields', 'id', 'parentId'];

  const defaultObject = {
    createdAt: 'unknown',
    priority: 0,
  };

  const responseHandler = (response) => {
    const items = response.items.map((item) => ({
      ...item,
      communications: mapDefaultCommunications(item),
    }));
    return { items, next: response.next };
  }; // переробити, це треба робити в return items:

  const {
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
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await memberService.searchMemberInQueue(
      parentId,
      page,
      size,
      search,
      sort,
      fields,
      id,
      bucket,
      undefined,
      from,
      to,
      undefined,
      undefined,
      cause,
      priorityFrom || priority?.from,
      priorityTo || priority?.to,
      undefined,
      undefined,
      undefined,
      agent,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
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

// const itemGetter = new SdkGetterApiConsumer(
//   memberService.readMember,
//   { defaultSingleObject, itemResponseHandler },
// );
const getMember = async ({ parentId, itemId: id }) => {
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
    const response = await memberService.readMember(parentId, id);
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

// const itemCreator = new SdkCreatorApiConsumer(
//   memberService.createMember,
//   { fieldsToSend, preRequestHandler },
// );
const addMember = async ({ parentId, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await memberService.createMember(parentId, item);
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

// const itemUpdater = new SdkUpdaterApiConsumer(
//   memberService.updateMember,
//   { fieldsToSend, preRequestHandler },
// );
const updateMember = async ({ itemInstance, itemId: id, parentId }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await memberService.updateMember(parentId, id, item);
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
const deleteMember = async ({ parentId, id }) => {
  try {
    const response = await memberService.deleteMember(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const resetMembersApiConsumer = new SdkPatcherApiConsumer(memberService.resetMembers);

// const resetMembers = ({ parentId }) => resetMembersApiConsumer
// .patchItem({ id: parentId, changes: {} });

const resetMembers = async ({ parentId }) => {
  // const body = applyTransform(changes, [
  //   sanitize(fieldsToSend),
  //   camelToSnake(),
  // ]);
  try {
    const response = await memberService.resetMembers(parentId, {});
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
