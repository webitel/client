import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';

const facebookChatGateway = () => ({
  ...defaultChatGateway(),
  provider: MessengerType.FACEBOOK,
  metadata: {
    AccessToken: '',
    VerifyToken: '',
    url: 'https://graph.facebook.com/v11.0/me/messages?access_token=',
  },
});

export default facebookChatGateway;
