import path from 'path';
import axios from 'axios';
import instance from '../../../../../app/api/instance';
import getChatOriginUrl from '../scripts/getChatOriginUrl';

const chatBaseUrl = new URL(
  path.normalize(import.meta.env.VITE_CHAT_URL),
  getChatOriginUrl(),
).toString();

const chatInstance = axios.create({
  ...instance.config,
  baseURL: chatBaseUrl,
});

console.log('chatInstance:', chatInstance);

export default chatInstance;
export { chatBaseUrl };
