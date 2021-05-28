import instance from '../../../../../app/api/instance';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';

const LICENSE_URL = '/license';
const CUSTOMER_URL = '/customer';

const defaultListObject = {
  remain: 0,
  limit: 0,
};

const listGetter = new APIListGetter(LICENSE_URL, { defaultListObject });

export const getLicenseList = (params) => listGetter.getList({ ...params, searchQuery: 'q' });
export const updateLicense = async (data) => {
  try {
    const response = await instance.put(CUSTOMER_URL, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  getList: getLicenseList,
  update: updateLicense,
};
