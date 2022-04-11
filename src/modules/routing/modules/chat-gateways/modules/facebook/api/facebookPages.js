import path from 'path';
import axios from 'axios';
import instance from '../../../../../../../app/api/instance';
import defaultInterceptorsSetup
  from '../../../../../../../app/api/interceptors/defaultInterceptorsSetup';
import getChatOriginUrl from '../../../scripts/getChatOriginUrl';

const chatBaseUrl = new URL(path.normalize(process.env.VUE_APP_CHAT_URL), getChatOriginUrl())
  .toString();

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
const getList = async ({ uri }) => {
  const url = `${uri}?pages=`;
  const data = await facebookPagesInstance.get(url);
  return data.map((item) => ({ ...defaultListObject, ...item }));
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}/${uri}/?pages=setup`;

const updateSubscribe = ({ uri, value, id }) => {
  const action = value ? 'subscribe' : 'unsubscribe';
  const url = `${uri}?pages=${action}&id=${id}`;
  return facebookPagesInstance.get(url);
};

const FacebookPagesAPI = {
  getList,
  addOrRemovePagesUrl,
  updateSubscribe,
};

export default FacebookPagesAPI;
