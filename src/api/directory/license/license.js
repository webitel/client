import instance from '../../instance';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';

const LICENSE_URL = '/license';
const CUSTOMER_URL = '/customer';

const defaultListObject = {
  remain: 0,
  limit: 0,
};

const listGetter = new WebitelAPIListGetter(LICENSE_URL, { defaultItem: defaultListObject });

export const getLicenseList = (params) => listGetter.getList(params);
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
