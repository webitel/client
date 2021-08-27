import defaultChatGateway from '../defaults/defaultChatGateway';

const webChatGateway = () => ({
  ...defaultChatGateway,
  metadata: {
    allowOrigin: '',
    readTimeout: '30s',
    writeTimeout: '10s',
    handshakeTimeout: '10s',
    messageSizeMax: '4096',
  },
});

export default webChatGateway;
W
