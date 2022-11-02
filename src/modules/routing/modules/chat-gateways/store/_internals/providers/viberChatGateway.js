import ChatGatewayProvider from '../../../enum/ChatGatewayProvider.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const viberChatGateway = () => ({
  ...defaultChatGateway(),
  provider: ChatGatewayProvider.VIBER,
  metadata: {
    token: '',
    botName: '',
    btnBackColor: '#1d2733',
    btnFontColor: '#ffffff',
    // eventTypes: '',
  },
});

export default viberChatGateway;
