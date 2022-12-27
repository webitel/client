import ChatGatewayProvider from '../../../enum/ChatGatewayProvider.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const messengerChatGateway = () => ({
  ...defaultChatGateway(),
  provider: ChatGatewayProvider.MESSENGER,
  metadata: {
    clientId: '',
    clientSecret: '',
    instagramComments: false,
    instagramMentions: false,
  },
});

export default messengerChatGateway;
