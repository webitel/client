<template>
  <button
    class="telegram-app-button"
    type="button"
    wide
    @click="handleButtonClick"
  >
    Joinnnn Telegram!
  </button>
</template>

<script>
import { chatBaseUrl } from '../../api/chatInstance';
import openMessengerWindow from '../../modules/messenger/facebook/scripts/openMessengerWindow';
import chatGatewaysTelegramAppAPI from '../../modules/telegram-app/api/chatGatewaysTelegramAppAPI';

export default {
  name: 'telegram-app-button',
  props: {
    uri: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isAuthorized: false,
  }),
  methods: {
    handleButtonClick() {
      if (this.isAuthorized) {
        chatGatewaysTelegramAppAPI.logout(this.uri);
      } else {
        const url = `${chatBaseUrl}${this.uri}?auth`;
        openMessengerWindow({ url, listener: (e) => console.log(e) });
      }
    },
  },
  created() {
    chatGatewaysTelegramAppAPI.getAuth(this.uri);
  },
};
</script>

<style lang="scss" scoped>
.telegram-app-button {
  width: fit-content;
  display: inline-block;
  overflow: hidden;
  margin: 0;
  padding: 9px 21px 11px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  vertical-align: top;
  text-overflow: ellipsis;
  color: #fff;
  border: none;
  border-radius: 20px;
  background-color: #54a9eb;
}
</style>
