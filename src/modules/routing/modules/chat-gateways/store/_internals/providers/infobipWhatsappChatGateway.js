import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const infobipWhatsappChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.WHATSAPP,
  metadata: {
    apiKey: '',
    number: '',
    url: '',
    scenarioKey: '',
  },
});

export default infobipWhatsappChatGateway;
