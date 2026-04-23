import chatInstance from '../../../api/chatInstance';

const getAuth = async (uri) => {
	const url = `${uri}`;
	const { data } = await chatInstance.get(url);
	return data;
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
