import ChatGatewayProvider from '../../../enum/ChatGatewayProvider.enum';

export default (messengerType) => {
  switch (messengerType) {
    case ChatGatewayProvider.INFOBIP:
      return 'infobip';
    case ChatGatewayProvider.TELEGRAM_BOT:
      return 'telegram';
    default:
      return messengerType;
  }
};
