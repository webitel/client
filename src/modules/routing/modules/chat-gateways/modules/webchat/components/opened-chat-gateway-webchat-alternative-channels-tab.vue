<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{
          $t('objects.routing.chatGateways.webchat.alternativeChannels.alternativeChannels')
        }}
      </h3>
    </header>
    <section class="webchat-alternative-channels-sections-wrapper">
      <article class="webchat-alternative-channels-section">
        <header>{{ $t('objects.routing.chatGateways.webchat.alternativeChannels.messagingChannels') }}</header>
        <div class="object-input-grid object-input-grid__1-col">
          <div
            v-for="(channel) of alternativeChannels"
            :key="channel"
            class="webchat-alternative-channel"
          >
            <wt-icon
              :icon="channelIcon[channel]"
              size="lg"
            />
            <copy-input
              :disabled="disableUserInput"
              :placeholder="$t(channelUrlPlaceholder[channel])"
              :value="itemInstance.metadata.alternativeChannels[channel].url"
              @input="handleUrlInput({ channel, value: $event })"
            />
            <wt-switcher
              :disabled="disableUserInput"
              :value="itemInstance.metadata.alternativeChannels[channel].enabled"
              @change="setAltChannelValue({ channel, prop: 'enabled', value: $event })"
            />
          </div>
        </div>
      </article>
      <article class="webchat-alternative-channels-section">
        <header>{{ $t('objects.routing.chatGateways.webchat.alternativeChannels.onlineCall') }}</header>
        <div class=" object-input-grid object-input-grid__1-col">
          <wt-switcher
            :disabled="disableUserInput"
            :value="itemInstance.metadata.call.enabled"
            @change="setItemProp({ path: 'metadata.call.enabled', value: $event })"
          />
          <wt-input
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.webchat.call.url')"
            :v="v.itemInstance.metadata.call.url"
            :value="itemInstance.metadata.call.url"
            @input="setItemProp({ path: 'metadata.call.url', value: $event })"
          />
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import WebchatAlternativeChannel from '../../../enum/WebchatAlternativeChannel.enum';
import uriCopyMixin from '../../../mixins/uriCopyMixin';

export default {
  name: 'OpenedChatWebchatAlternativeChannelsTab',
  components: { updatee },
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
      [WebchatAlternativeChannel.TELEGRAM]: 'objects.routing.chatGateways.webchat.alternativeChannels.telegram',
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
@import '../../../css/chat-gateways';

.webchat-alternative-channels-sections-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.webchat-alternative-channels-section {
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
}

.webchat-alternative-channel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  .copy-input {
    flex-grow: 1;
  }
}
</style>
