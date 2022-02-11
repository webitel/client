import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import WebchatAlternativeChannel
  from '../../../enum/WebchatAlternativeChannel.enum';
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
    lang: 'en',
    btnOpacity: '',
    logoUrl: '',
    accentColor: '',
    position: '',
    timeoutIsActive: false,
    openTimeout: '',
    alternativeChannels: Object
      .values(WebchatAlternativeChannel)
      .reduce((channels, channel) => (
        {
          ...channels,
          [channel]: {
            url: '',
            enabled: false,
          },
        }
      ), {}),
  },
});

export default webChatGateway;
