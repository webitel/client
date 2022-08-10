import ChatGatewayProvider from '../../../enum/ChatGatewayProvider.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const viberChatGateway = () => ({
  ...defaultChatGateway(),
  provider: ChatGatewayProvider.VIBER,
  metadata: {
    token: '',
    botName: '',
    // eventTypes: '',
  },
});

export default viberChatGateway;
