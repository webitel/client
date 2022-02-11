<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat') }}</h3>
    </header>
    <form class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <div
        class="webchat-alternative-channel"
        v-for="(channel) of alternativeChannels"
        :key="channel"
      >
        <wt-icon
          :icon="`messenger-${channel}`"
          size="lg"
        ></wt-icon>
        <copy-input
          :disabled="disableUserInput"
          :placeholder="$t('objects.routing.chatGateways.webchat.alternativeChannels.url')"
          :value="itemInstance.metadata.alternativeChannels[channel].url"
          @input="setAltChannelValue({ channel, prop: 'url', value: $event })"
        ></copy-input>
        <wt-switcher
          :disabled="disableUserInput"
          :value="itemInstance.metadata.alternativeChannels[channel].enabled"
          @change="setAltChannelValue({ channel, prop: 'enabled', value: $event })"
        ></wt-switcher>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import uriCopyMixin from '../../mixins/uriCopyMixin';
import WebchatAlternativeChannel from '../../enum/WebchatAlternativeChannel.enum';

export default {
  name: 'opened-chat-webchat-alternative-channels-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  data: () => ({
    alternativeChannels: Object.values(WebchatAlternativeChannel),
  }),
  methods: {
    ...mapActions({
      setAltChannelValue(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_ALTERNATIVE_CHANNEL_VALUE`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/chat-gateways';

.webchat-alternative-channel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  .copy-input {
    flex-grow: 1;
  }
}
</style>
