<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.webchat') }}</h3>
    </header>
    <div class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <div
        v-for="(channel) of alternativeChannels"
        :key="channel"
        class="webchat-alternative-channel"
      >
        <wt-icon
          :icon="channelIcon[channel]"
          size="lg"
        ></wt-icon>
        <copy-input
          :disabled="disableUserInput"
          :placeholder="$t(channelUrlPlaceholder[channel])"
          :value="itemInstance.metadata.alternativeChannels[channel].url"
          @input="handleUrlInput({ channel, value: $event })"
        ></copy-input>
        <wt-switcher
          :disabled="disableUserInput"
          :value="itemInstance.metadata.alternativeChannels[channel].enabled"
          @change="setAltChannelValue({ channel, prop: 'enabled', value: $event })"
        ></wt-switcher>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import WebchatAlternativeChannel from '../../enum/WebchatAlternativeChannel.enum';
import uriCopyMixin from '../../mixins/uriCopyMixin';

export default {
  name: 'opened-chat-webchat-alternative-channels-tab',
  mixins: [openedTabComponentMixin, uriCopyMixin],
  data: () => ({
    alternativeChannels: Object.values(WebchatAlternativeChannel),
    channelIcon: {
      ...Object.values(WebchatAlternativeChannel)
               .reduce((channels, channel) => ({ ...channels, [channel]: `messenger-${channel}` }), {}),
      [WebchatAlternativeChannel.EMAIL]: 'mail--color',
    },
    channelUrlPlaceholder: {
      ...Object.values(WebchatAlternativeChannel)
               .reduce((channels, channel) => ({
                 ...channels,
                 [channel]: `objects.routing.chatGateways.${channel}.${channel}`,
               }), {}),
      [WebchatAlternativeChannel.EMAIL]: 'objects.routing.chatGateways.webchat.alternativeChannels.email',
      [WebchatAlternativeChannel.WHATSAPP]: 'objects.routing.chatGateways.webchat.alternativeChannels.whatsapp',
    },
  }),
  methods: {
    ...mapActions({
      setAltChannelValue(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_ALTERNATIVE_CHANNEL_VALUE`, payload);
      },
    }),
    handleUrlInput({ channel, value }) {
      this.setAltChannelValue({ channel, prop: 'url', value });
      if (!value) {
        this.setAltChannelValue({ channel, prop: 'enabled', value: false });
      }
    },
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
