import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const telegramChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.TELEGRAM,
  metadata: {
    token: '',
  },
});

export default telegramChatGateway;
