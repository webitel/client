import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';

import defaultChatGateway from '../defaults/defaultChatGateway';

const customChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.CUSTOM,
	metadata: {
		secret: '',
		webhook: '',
	},
});

export default customChatGateway;
