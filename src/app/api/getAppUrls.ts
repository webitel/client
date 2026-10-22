import type { AppUrls } from '@webitel/api-services/api';

/** [Claude] in dev the services sit on the api host, not on the dev server; a relative api url means the app's own host */
const getServicesOrigin = () =>
	import.meta.env.PROD
		? window.location.origin
		: new URL(import.meta.env.VITE_API_URL, window.location.origin).origin;

/** [Claude] `VITE_CHAT_URL` comes as `chat` or `/chat`; both resolve against the services origin */
const getChatUrl = () => {
	const chatPath = import.meta.env.VITE_CHAT_URL;
	return chatPath
		? new URL(chatPath, `${getServicesOrigin()}/`).toString()
		: '';
};

/**
 * [Claude] The app's service urls and token for api-services helpers that can't
 * reach them on their own. Read on every call, as the token changes after login.
 */
export const getAppUrls = (): AppUrls => ({
	apiUrl: import.meta.env.VITE_API_URL,
	chatUrl: getChatUrl(),
	accessToken: localStorage.getItem('access-token') || '',
});
