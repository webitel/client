import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const viberChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.VIBER,
  metadata: {
    token: '',
    botName: '',
    eventTypes: '',
  },
});

export default viberChatGateway;
