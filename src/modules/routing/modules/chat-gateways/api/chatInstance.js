import axios from 'axios';
import path from 'path';
import instance, { config } from '../../../../../app/api/old/instance';
import defaultInterceptorsSetup
  from '../../../../../app/api/old/interceptors/defaultInterceptorsSetup';
import getChatOriginUrl from '../scripts/getChatOriginUrl';

const chatBaseUrl = new URL(path.normalize(process.env.VUE_APP_CHAT_URL), getChatOriginUrl())
.toString();

const chatInstance = axios.create({
  ...instance.config,
  baseURL: chatBaseUrl,
});

defaultInterceptorsSetup({ instance: chatInstance, config });

export default chatInstance;
export { chatBaseUrl };
