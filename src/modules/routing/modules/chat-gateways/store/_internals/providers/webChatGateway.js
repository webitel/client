import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const webChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.WEB_CHAT,
  metadata: {
    allowOrigin: [],
    readTimeout: '30',
    writeTimeout: '1',
    handshakeTimeout: '10',
    wsUrl: '',
    borderRadiusStyle: '',
    lang: '',
    btnOpacity: '',
    logoUrl: '',
    accentColor: '',
    position: '',
  },
});

export default webChatGateway;
