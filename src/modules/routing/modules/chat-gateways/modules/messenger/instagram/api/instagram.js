import path from 'path';
import axios from 'axios';
import instance from '../../../../../../../../app/api/instance';
import defaultInterceptorsSetup
  from '../../../../../../../../app/api/interceptors/defaultInterceptorsSetup';
import getChatOriginUrl from '../../../../scripts/getChatOriginUrl';

const chatBaseUrl = new URL(path.normalize(process.env.VUE_APP_CHAT_URL), getChatOriginUrl())
  .toString();

const instagramInstance = axios.create({
                                             ...instance.config,
                                             baseURL: chatBaseUrl,
                                           });

defaultInterceptorsSetup(instagramInstance);

const defaultListObject = {
  accounts: [],
};

/* I decided not to use api consumer because they do not
 have this flexibility to work with base url and params */
const getList = async ({ uri }) => {
  const url = `${uri}?instagram=`;
  const data = await instagramInstance.get(url);
  return data.map((item) => ({ ...defaultListObject, ...item }));
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}/${uri}/?instagram=setup`;

const InstagramAPI = {
  getList,
  addOrRemovePagesUrl,
};

export default InstagramAPI;
