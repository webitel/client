import ChatGatewayProvider from '../../../enum/ChatGatewayProvider.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const infobipChatGateway = () => ({
  ...defaultChatGateway(),
  provider: ChatGatewayProvider.INFOBIP,
  metadata: {
    apiKey: '',
    // number: '',
    url: '',
  },
});

export default infobipChatGateway;
