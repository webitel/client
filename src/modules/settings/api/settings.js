import EndpointPatcherApiConsumer from 'webitel-sdk/esm2015/api-consumers';
import APIItemGetter from '../../../app/api/BaseAPIServices/Getter/ApiGetter';
import APIPatcher from '../../../app/api/BaseAPIServices/Patcher/ApiPatcher';
import instance from '../../../app/api/instance';


const BASE_URL = '/users';

const fieldsToSend = ['password'];

const itemGetter = new APIItemGetter(BASE_URL);
const itemPatcher = new APIPatcher(BASE_URL, { fieldsToSend });
const patcher = new EndpointPatcherApiConsumer({ baseUrl: 'users', instance });

// export const getPasswordList = (params) => listGetter.getList({ ...params });
export const getPasswordItem = (params) => itemGetter.getItem(params);
export const patchPasswordList = (params) => itemPatcher.patchItem(params);
// eslint-disable-next-line max-len
export const patchMe = ({ password, userId }) => patcher.patch({ itemId: userId, changes: { password } });

export default {
  getPasswordItem,
  patchPasswordList,
  patchMe,
};
