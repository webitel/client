import { EndpointPatcherApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/instance';

const baseUrl = 'users';
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance });

export const changePassword = ({ id, changes }) => itemPatcher.patchItem({ id, changes });

export const changeWebPhone = async (changes) => {
  const url = 'user/settings/phone';

  try {
    const response = await instance.put(url, changes);
    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  changePassword,
  changeWebPhone,
};
