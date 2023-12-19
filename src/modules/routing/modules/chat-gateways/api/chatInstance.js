import axios from 'axios';
import path from 'path';
import instance from '../../../../../app/api/instance';
import getChatOriginUrl from '../scripts/getChatOriginUrl';

const chatBaseUrl = new URL(path.normalize(import.meta.env.VITE_CHAT_URL), getChatOriginUrl())
.toString();
console.log('Chat instanse')
const chatInstance = axios.create({
  ...instance.config,
  baseURL: chatBaseUrl,
});

// defaultInterceptorsSetup({ instance: chatInstance, config });

export default chatInstance;
export { chatBaseUrl };
