import axios from 'axios';
import instance from '../../../../../../../app/api/instance';
import defaultInterceptorsSetup
  from '../../../../../../../app/api/interceptors/defaultInterceptorsSetup';
import getChatOriginUrl from '../../../scripts/getChatOriginUrl';

const chatBaseUrl = getChatOriginUrl().concat(process.env.VUE_APP_CHAT_URL);

const facebookPagesInstance = axios.create({
                                             ...instance.config,
                                             baseURL: chatBaseUrl,
                                           });

defaultInterceptorsSetup(facebookPagesInstance);

const defaultListObject = {
  accounts: [],
};

/* I decided not to use api consumer because they do not
 have this flexibility to work with base url and params */
const getList = async ({ baseUrl }) => {
  const url = `${baseUrl}?pages=`;
  const data = await facebookPagesInstance.get(url);
  return data.map((item) => ({ ...defaultListObject, ...item }));
};

const addOrRemovePagesUrl = (baseUrl) => `${chatBaseUrl}/${baseUrl}/?pages=setup`;

const updateSubscribe = ({ baseUrl, value, id }) => {
  const action = value ? 'subscribe' : 'unsubscribe';
  const url = `${baseUrl}?pages=${action}&id=${id}`;
  return facebookPagesInstance.get(url);
};

const FacebookPagesAPI = {
  getList,
  addOrRemovePagesUrl,
  updateSubscribe,
};

export default FacebookPagesAPI;
