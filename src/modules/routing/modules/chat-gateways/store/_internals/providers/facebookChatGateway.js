import defaultChatGateway from '../defaults/defaultChatGateway';

const facebookChatGateway = () => ({
  ...defaultChatGateway(),
  metadata: {
    AccessToken: '',
    VerifyToken: '',
    url: 'https://graph.facebook.com/v11.0/me/messages?access_token=',
  },
});

export default facebookChatGateway;
