import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';

import defaultChatGateway from '../defaults/defaultChatGateway';

const telegramBotChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.TELEGRAM_BOT,
	metadata: {
		token: '',
	},
});

export default telegramBotChatGateway;
