const getChatOriginUrl = () => (process.env.NODE_ENV === 'production'
  ? window.location.origin
  : 'https://dev.webitel.com');

export default getChatOriginUrl;
