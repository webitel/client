import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';

import defaultChatGateway from '../defaults/defaultChatGateway';

const infobipChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.INFOBIP,
	metadata: {
		apiKey: '',
		// number: '',
		url: '',
	},
});

export default infobipChatGateway;
