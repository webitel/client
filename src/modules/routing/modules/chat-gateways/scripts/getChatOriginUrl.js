const getChatOriginUrl = () =>
	import.meta.env.PROD ? window.location.origin : 'https://dev.webitel.com';

export default getChatOriginUrl;
