import { EndpointListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';

const baseUrl = '/license';
const nestedUrl = '/users';

const defaultListObject = {};

const listGetter = new EndpointListGetterApiConsumer({
  baseUrl,
  instance,
}, { defaultListObject, nestedUrl });

const getList = (params) => listGetter.getNestedList(params);

const LicenseUsersAPI = {
  getList,
};

export default LicenseUsersAPI;
