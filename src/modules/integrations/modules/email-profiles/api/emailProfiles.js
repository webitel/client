import { EmailProfileServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const emailProfilesService = new EmailProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'domainId',
  'enabled',
  'imapHost',
  'smtpHost',
  'fetchInterval',
  'imapPort',
  'login',
  'mailbox',
  'password',
  'schema',
  'smtpPort',
];

// const defaultListObject = {
//   enabled: false,
// };

// const defaultSingleObject = {
//   imapPort: 0,
//   smtpPort: 0,
// };

const itemResponseHandler = (response) => {
  return {
    ...response,
  };
};

const preRequestHandler = (item) => {
  return {
    ...item,
  };
};

// const listGetter = new SdkListGetterApiConsumer(
//   emailProfilesService.searchEmailProfile,
//   {
//     defaultListObject,
//   },
// );
const getList = async (params) => {
  const defaultObject = {
    enabled: false,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    team,
    skill,
    isSupervisor,
    isNotSupervisor,
    notTeamId,
    supervisorId,
    notSkillId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await agentService.searchAgent(
      page,
      size,
      search,
      sort,
      fields,
      id,
      undefined,
      supervisorId,
      team,
      undefined,
      undefined,
      isSupervisor,
      skill,
      undefined,
      isNotSupervisor,
      undefined,
      undefined,
      notTeamId,
      notSkillId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        listResponseHandler,
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemGetter = new SdkGetterApiConsumer(
//   emailProfilesService.readEmailProfile,
//   {
//     defaultSingleObject,
//     itemResponseHandler,
//   },
// );
const get = async ({ itemId: id }) => {
  const defaultObject = {
    imapPort: 0,
    smtpPort: 0,
  };

  const responseHandler = (response) => {
    return {
      ...response,
    };
  };

  try {
    const response = await agentService.readAgent(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemCreator = new SdkCreatorApiConsumer(
//   emailProfilesService.createEmailProfile,
//   {
//     fieldsToSend,
//     preRequestHandler,
//   },
// );
const add = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.createAgent(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemPatcher = new SdkPatcherApiConsumer(
//   emailProfilesService.patchEmailProfile,
//   { fieldsToSend },
// );
const patch = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentService.patchAgent(id, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemUpdater = new SdkUpdaterApiConsumer(
//   emailProfilesService.updateEmailProfile,
//   {
//     fieldsToSend,
//     preRequestHandler,
//   },
// );
const update = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await teamService.updateAgentTeam(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


// const itemDeleter = new SdkDeleterApiConsumer(emailProfilesService.deleteEmailProfile);
const deleteItem = async ({ id }) => {
  try {
    const response = await teamService.deleteAgentTeam(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


const getLookup = (params) => getList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const EmailProfilesAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
  getLookup,
};

export default EmailProfilesAPI;
