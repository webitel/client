<template>
  <div class="telegram-app-button">
    <p v-if="isAuthorized">
      {{ $t('objects.routing.chatGateways.telegramApp.signedAs') }}
      {{ state.account.FirstName }} {{ state.account.LastName }}
    </p>
    <button
      class="telegram-app-button__button"
      type="button"
      @click="handleButtonClick"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script>
import { chatBaseUrl } from '../../api/chatInstance';
import openMessengerWindow from '../../modules/messenger/_shared/scripts/openMessengerWindow';
import chatGatewaysTelegramAppAPI from '../../modules/telegram-app/api/chatGatewaysTelegramAppAPI';

export default {
	name: 'TelegramAppButton',
	props: {
		uri: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		state: {},
	}),
	computed: {
		isAuthorized() {
			return this.state.authorized;
		},
		btnText() {
			return this.isAuthorized
				? this.$t('vocabulary.logout')
				: this.$t('objects.routing.chatGateways.telegramApp.joinTelegram');
		},
	},
	created() {
		this.loadAuth();
	},
	methods: {
		async handleButtonClick() {
			if (this.isAuthorized) {
				try {
					await chatGatewaysTelegramAppAPI.logout(this.uri);
				} finally {
					await this.loadAuth();
				}
			} else {
				const url = `${chatBaseUrl}${this.uri}?auth`;
				openMessengerWindow({
					url,
					listener: ({ data }) => {
						if (data.status === 'success') this.loadAuth();
					},
				});
			}
		},
		async loadAuth() {
			this.state = await chatGatewaysTelegramAppAPI.getAuth(this.uri);
		},
	},
};
</script>

<style lang="scss" scoped>
.telegram-app-button {
  text-align: center;
}

.telegram-app-button__button {
  display: block;
  overflow: hidden;
  width: fit-content;
  margin: 9px auto;
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
