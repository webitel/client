import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import WebchatAlternativeChannel
  from '../../../enum/WebchatAlternativeChannel.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const webChatGateway = (_btnCodeDirty = false) => ({
  ...defaultChatGateway(),
  provider: MessengerType.WEB_CHAT,
  metadata: {
    allowOrigin: [],
    readTimeout: '30',
    writeTimeout: '1',
    handshakeTimeout: '10',
    _btnCodeDirty, // inner flag, if true, btn "copy code" is highlighted
    wsUrl: '',
    borderRadiusStyle: '',
    lang: 'en',
    btnOpacity: '',
    logoUrl: '',
    accentColor: '',
    position: '',
    timeoutIsActive: false,
    openTimeout: '',
    mediaMaxSize: 10 * 1024 * 1024, // 10mb
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
