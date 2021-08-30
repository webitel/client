import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const webChatGateway = () => ({
  ...defaultChatGateway,
  provider: MessengerType.WEB_CHAT,
  metadata: {
    allowOrigin: '',
    readTimeout: '30s',
    writeTimeout: '10s',
    handshakeTimeout: '10s',
    messageSizeMax: '4096',
  },
});

export default webChatGateway;
