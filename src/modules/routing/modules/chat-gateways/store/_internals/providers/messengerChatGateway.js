import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const messengerChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.MESSENGER,
  metadata: {
    clientId: '',
    clientSecret: '',
  },
});

export default messengerChatGateway;