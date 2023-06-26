import {
  EndpointListGetterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';

const LICENSE_URL = '/license';
const CUSTOMER_URL = '/customer';

const defaultListObject = {
  remain: 0,
  limit: 0,
};

const listGetter = new EndpointListGetterApiConsumer({ baseUrl: LICENSE_URL, instance },
  { defaultListObject });

const getLicenseList = (params) => listGetter.getList(params);
const updateLicense = async (data) => {
  try {
    const response = await instance.put(CUSTOMER_URL, data);
    return response;
  } catch (err) {
    throw err;
  }
};

const licenseAPI = {
  getList: getLicenseList,
  update: updateLicense,
};

export default licenseAPI;
