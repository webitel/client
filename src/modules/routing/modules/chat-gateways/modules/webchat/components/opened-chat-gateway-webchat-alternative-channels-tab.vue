<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm" />
      <h3 class="content-title typo-heading-4">
        {{
          $t('objects.routing.chatGateways.webchat.alternativeChannels.alternativeChannels')
        }}
      </h3>
    </header>
    <section class="webchat-alternative-channels-sections-wrapper">
      <article class="webchat-alternative-channels-section">
        <header class="webchat-alternative-channels-section-header typo-heading-3">
          {{ $t('objects.routing.chatGateways.webchat.alternativeChannels.title') }}
        </header>
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
              :model-value="itemInstance.metadata.alternativeChannels[channel].enabled"
              @update:model-value="setAltChannelValue({ channel, prop: 'enabled', value: $event })"
            />
          </div>
        </div>
      </article>
      <article class="webchat-alternative-channels-section">
        <header class="webchat-alternative-channels-section-header typo-heading-3">
          {{ $t('objects.routing.chatGateways.webchat.call.title') }}
        </header>
        <div class="webchat-call-section-title-wrapper">
          <wt-icon icon="call" />
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="itemInstance.metadata.call.enabled"
            @update:model-value="setWebchatMetadata({ path: 'metadata.call.enabled', value: $event })"
          />
        </div>
        <div class=" object-input-grid object-input-grid__1-col">
          <wt-input-text
            :disabled="disableUserInput || !itemInstance.metadata.call.enabled"
            :label="$t('objects.routing.chatGateways.webchat.call.url')"
            :v="v.itemInstance.metadata.call.url"
            :model-value="itemInstance.metadata.call.url"
            @update:model-value="setWebchatMetadata({ path: 'metadata.call.url', value: $event })"
          />
          <wt-select
            :disabled="disableUserInput || !itemInstance.metadata.call.enabled"
            :label="$t('objects.routing.flow.flow', 1)"
            :search-method="loadCallFlows"
            :v="v.itemInstance.metadata.call.flow"
            :value="itemInstance.metadata.call.flow"
            @input="setWebchatMetadata({ path: 'metadata.call.flow', value: $event })"
          />
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../flow/api/flow';
import WebchatAlternativeChannel from '../../../enum/WebchatAlternativeChannel.enum';
import uriCopyMixin from '../../../mixins/uriCopyMixin';

export default {
	name: 'OpenedChatWebchatAlternativeChannelsTab',
	mixins: [
		openedTabComponentMixin,
		uriCopyMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	data: () => ({
		alternativeChannels: Object.values(WebchatAlternativeChannel),
		channelIcon: {
			...Object.values(WebchatAlternativeChannel).reduce(
				(channels, channel) => ({
					...channels,
					[channel]: `messenger-${channel}`,
				}),
				{},
			),
			[WebchatAlternativeChannel.EMAIL]: 'mail--color',
		},
		channelUrlPlaceholder: {
			...Object.values(WebchatAlternativeChannel).reduce(
				(channels, channel) => ({
					...channels,
					[channel]: `objects.routing.chatGateways.${channel}.${channel}`,
				}),
				{},
			),
			[WebchatAlternativeChannel.EMAIL]:
				'objects.routing.chatGateways.webchat.alternativeChannels.email',
			[WebchatAlternativeChannel.WHATSAPP]:
				'objects.routing.chatGateways.webchat.alternativeChannels.whatsapp',
			[WebchatAlternativeChannel.TELEGRAM]:
				'objects.routing.chatGateways.webchat.alternativeChannels.telegram',
			[WebchatAlternativeChannel.MESSENGER]:
				'objects.routing.chatGateways.webchat.alternativeChannels.messenger',
		},
	}),
	methods: {
		...mapActions({
			setAltChannelValue(dispatch, payload) {
				return dispatch(
					`${this.namespace}/SET_WEBCHAT_ALTERNATIVE_CHANNEL_VALUE`,
					payload,
				);
			},
			setWebchatMetadata(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_WEBCHAT_ITEM_METADATA`, payload);
			},
		}),
		loadCallFlows: (params) =>
			FlowsAPI.getLookup({
				...params,
				type: [
					EngineRoutingSchemaType.Voice,
					EngineRoutingSchemaType.Default,
				],
			}),
		handleUrlInput({ channel, value }) {
			this.setAltChannelValue({
				channel,
				prop: 'url',
				value,
			});
			if (!value) {
				this.setAltChannelValue({
					channel,
					prop: 'enabled',
					value: false,
				});
			}
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
@use '@webitel/ui-sdk/src/css/main' as *;
@use '../../../css/chat-gateways';

.webchat-alternative-channels-sections-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.webchat-alternative-channels-section {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
  gap: var(--spacing-sm);
}


.webchat-alternative-channel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  .copy-input {
    flex-grow: 1;
  }
}

.webchat-call-section-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}
</style>
