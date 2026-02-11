import chatInstance from '../../../api/chatInstance';

const getAuth = (uri) => {
	const url = `${uri}`;
	return chatInstance.get(url);
};

const logout = (uri) => {
	const url = `${uri}?logout=`;
	return chatInstance.post(url, {});
};

const ChatGatewaysTelegramAppAPI = {
	getAuth,
	logout,
};

export default ChatGatewaysTelegramAppAPI;
