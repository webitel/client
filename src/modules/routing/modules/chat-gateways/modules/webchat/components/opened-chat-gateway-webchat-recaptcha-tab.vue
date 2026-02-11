<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.routing.chatGateways.webchat.recaptcha.recaptcha') }}
      </h3>
    </header>
    <div class="object-input-grid object-input-grid__w50 object-input-grid__1-col">
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.enabled')"
        :model-value="itemInstance.metadata.captcha.enabled"
        @update:model-value="setWebchatMetadata({ path: 'metadata.captcha.enabled', value: $event })"
      />
      <wt-input-text
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.sitekey')"
        :v="v.itemInstance.metadata.captcha.sitekey"
        :model-value="itemInstance.metadata.captcha.sitekey"
        required
        @update:model-value="setWebchatMetadata({ path: 'metadata.captcha.sitekey', value: $event })"
      />
      <wt-input-text
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.secret')"
        :v="v.itemInstance.metadata.captcha.secret"
        :model-value="itemInstance.metadata.captcha.secret"
        required
        @update:model-value="setWebchatMetadata({ path: 'metadata.captcha.secret', value: $event })"
      />
      <wt-input-text
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.threshold')"
        :v="v.itemInstance.metadata.captcha.threshold"
        :model-value="itemInstance.metadata.captcha.threshold"
        required
        @update:model-value="setWebchatMetadata({ path: 'metadata.captcha.threshold', value: +$event })"
      />
      <wt-switcher
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.showFlag')"
        :model-value="itemInstance.metadata.captcha.showFlag"
        @update:model-value="setWebchatMetadata({ path: 'metadata.captcha.showFlag', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
	name: 'OpenedChatWebchatRecaptchaTab',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	computed: {
		disableCaptchaFields() {
			return (
				!this.itemInstance.metadata?.captcha?.enabled || this.disableUserInput
			);
		},
	},
	methods: {
		...mapActions({
			setWebchatMetadata(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_WEBCHAT_ITEM_METADATA`, payload);
			},
		}),
	},
};
</script>

<style
  lang="scss"
  scoped
>
@use '../../../css/chat-gateways';
</style>
