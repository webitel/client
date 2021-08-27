import defaultChatGateway from '../defaults/defaultChatGateway';

const viberChatGateway = () => ({
  ...defaultChatGateway,
  metadata: {
    token: '',
    botName: '',
    eventTypes: '',
  },
});

export default viberChatGateway;
