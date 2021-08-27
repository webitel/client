import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';

export default (messengerType) => {
  switch (messengerType) {
    case MessengerType.WEB_CHAT:
      return 'webchat';
    case MessengerType.FACEBOOK:
      return 'facebook';
    case MessengerType.WHATSAPP:
      return 'infobip-whatsapp';
    case MessengerType.VIBER:
      return 'viber';
    case MessengerType.TELEGRAM:
      return 'telegram';
    default:
      return 'unknown';
  }
};
