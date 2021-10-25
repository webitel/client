import { EndpointPatcherApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/instance';

const baseUrl = 'users';
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance });

export const changePassword = ({ id, changes }) => itemPatcher.patchItem({ id, changes });

export default {
  changePassword,
};
