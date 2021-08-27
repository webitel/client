import defaultChatGateway from '../defaults/defaultChatGateway';

const telegramChatGateway = () => ({
  ...defaultChatGateway(),
  provider: 'telegram',
  metadata: {
    token: '',
  },
});

export default telegramChatGateway;
