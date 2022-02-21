/* Difference between MessangerType enum and WebchatAlternativeChannel:
* MessangerType - backend fields naming, provider
* WebchatAlternativeChannel - front-end only "simple" channel naming
* */

const WebchatAlternativeChannel = Object.freeze({
                                                  VIBER: 'viber',
                                                  WHATSAPP: 'whatsapp',
                                                  TELEGRAM: 'telegram',
                                                  FACEBOOK: 'facebook',
                                                  EMAIL: 'email',
                                                });

export default WebchatAlternativeChannel;
