import ChatGatewayProvider from '../../../enum/ChatGatewayProvider.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const telegramBotChatGateway = () => ({
  ...defaultChatGateway(),
  provider: ChatGatewayProvider.TELEGRAM_BOT,
  metadata: {
    token: '',
  },
});

export default telegramBotChatGateway;
