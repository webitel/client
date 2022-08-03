import chatInstance from '../../../api/chatInstance';

const getAuth = (uri) => {
  const url = `${uri}`;
  return chatInstance.get(url);
};

const logout = (uri) => uri;

const ChatGatewaysTelegramAppAPI = {
  getAuth,
  logout,
};

export default ChatGatewaysTelegramAppAPI;
