import defaultChatGateway from '../defaults/defaultChatGateway';

const infobipWhatsappChatGateway = () => ({
  ...defaultChatGateway(),
  metadata: {
    apiKey: '',
    number: '',
    url: '',
    scenarioKey: '',
  },
});

export default infobipWhatsappChatGateway;
