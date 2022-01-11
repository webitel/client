export default {
  computed: {
    baseUrl() {
      return window.location.origin;
    },
    computeFullUrlToCopy() {
      return this.itemInstance.uri.includes('/chat')
        ? `${this.baseUrl}${this.itemInstance.uri}`
        : `${this.baseUrl}/chat${this.itemInstance.uri}`;
    },
  },
};
