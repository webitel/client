<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.webchat.recaptcha.recaptcha') }}
      </h3>
    </header>
    <div class="object-input-grid object-input-grid__w50 object-input-grid__1-col">
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.enabled')"
        :value="itemInstance.metadata.captcha.enabled"
        @change="setWebchatMetadata({ path: 'metadata.captcha.enabled', value: $event })"
      />
      <wt-input
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.sitekey')"
        :v="v.itemInstance.metadata.captcha.sitekey"
        :value="itemInstance.metadata.captcha.sitekey"
        required
        @input="setWebchatMetadata({ path: 'metadata.captcha.sitekey', value: $event })"
      />
      <wt-input
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.secret')"
        :v="v.itemInstance.metadata.captcha.secret"
        :value="itemInstance.metadata.captcha.secret"
        required
        @input="setWebchatMetadata({ path: 'metadata.captcha.secret', value: $event })"
      />
      <wt-input
        :disabled="disableCaptchaFields"
        :label="$t('objects.routing.chatGateways.webchat.recaptcha.threshold')"
        :v="v.itemInstance.metadata.captcha.threshold"
        :value="itemInstance.metadata.captcha.threshold"
        required
        @input="setWebchatMetadata({ path: 'metadata.captcha.threshold', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedChatWebchatRecaptchaTab',
  mixins: [openedTabComponentMixin],
  computed: {
    disableCaptchaFields() {
      return !this.itemInstance.metadata?.captcha?.enabled || this.disableUserInput;
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

<style lang="scss" scoped>
@import '../../../css/chat-gateways';

</style>
