import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const infobipChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.INFOBIP,
  metadata: {
    apiKey: '',
    // number: '',
    url: '',
  },
});

export default infobipChatGateway;
