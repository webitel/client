import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const messengerChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.FACEBOOK,
  metadata: {
    clientId: '',
    clientSecret: '',
  },
});

export default messengerChatGateway;
