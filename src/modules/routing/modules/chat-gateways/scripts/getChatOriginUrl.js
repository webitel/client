const getChatOriginUrl = () =>
	import.meta.env.PROD
		? window.location.origin
		: new URL(import.meta.env.VITE_API_URL).origin;

export default getChatOriginUrl;
