<template>
  <section class="opened-chat-gateway-webchat-alternative-channels">
    <article class="opened-chat-gateway-webchat-alternative-channels__section">
      <header class="typo-heading-3">
        {{ t('objects.routing.chatGateways.webchat.alternativeChannels.title') }}
      </header>
      <div class="opened-card-input-grid opened-card-input-grid--1-col">
        <div
          v-for="channel of alternativeChannels"
          :key="channel"
          class="opened-chat-gateway-webchat-alternative-channels__channel"
        >
          <wt-icon
            :icon="channelIcon[channel]"
            size="lg"
          />
          <copy-input
            :disabled="disableUserInput"
            :placeholder="t(channelUrlPlaceholder[channel])"
            :model-value="metadata.alternativeChannels[channel].url"
            @update:model-value="setChannelUrl(channel, $event)"
          />
          <wt-switcher
            v-model:model-value="metadata.alternativeChannels[channel].enabled"
            :disabled="disableUserInput"
          />
        </div>
      </div>
    </article>
    <article class="opened-chat-gateway-webchat-alternative-channels__section">
      <header class="typo-heading-3">
        {{ t('objects.routing.chatGateways.webchat.call.title') }}
      </header>
      <div class="opened-chat-gateway-webchat-alternative-channels__call-switch">
        <wt-icon icon="call" />
        <wt-switcher
          v-model:model-value="metadata.call.enabled"
          :disabled="disableUserInput"
        />
      </div>
      <div class="opened-card-input-grid opened-card-input-grid--1-col">
        <wt-input-text
          v-model:model-value="metadata.call.url"
          :disabled="isCallDisabled"
          :label="t('objects.routing.chatGateways.webchat.call.url')"
          :regle-validation="callFields?.url"
          :required="metadata.call.enabled"
        />
        <wt-single-select
          v-model:model-value="metadata.call.flow"
          :disabled="isCallFlowDisabled"
          :label="t('objects.routing.flow.flow', 1)"
          :regle-validation="callFields?.flow"
          :required="metadata.call.enabled"
          :search-method="hasFlowsReadAccess && searchCallFlows"
        />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { FlowsAPI } from '@webitel/api-services/api';
import { WebchatAlternativeChannel } from '@webitel/api-services/enums';
import { EngineRoutingSchemaType } from '@webitel/api-services/gen/models';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CopyInput from '../../../../../../../app/components/utils/copy-input.vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import type { ChatGatewayValidationFields } from '../../../types/ChatGatewayValidationFields';
import { useWebchatMetadata } from '../types/WebchatMetadata';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

const props = defineProps<{
	validationFields?: ChatGatewayValidationFields;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);
const metadata = useWebchatMetadata(modelValue);

const callFields = computed(
	() => props.validationFields?.metadata?.$fields?.call?.$fields,
);

const isCallDisabled = computed(
	() => disableUserInput.value || !metadata.value.call.enabled,
);

const isCallFlowDisabled = computed(
	() => isCallDisabled.value || !hasFlowsReadAccess.value,
);

const alternativeChannels = Object.values(WebchatAlternativeChannel);

const channelIcon: Record<WebchatAlternativeChannel, string> = {
	[WebchatAlternativeChannel.Viber]: 'messenger-viber',
	[WebchatAlternativeChannel.Whatsapp]: 'messenger-whatsapp',
	[WebchatAlternativeChannel.Telegram]: 'messenger-telegram',
	[WebchatAlternativeChannel.Messenger]: 'messenger-messenger',
	[WebchatAlternativeChannel.Email]: 'mail--color',
};

const channelUrlPlaceholder: Record<WebchatAlternativeChannel, string> = {
	[WebchatAlternativeChannel.Viber]: 'objects.routing.chatGateways.viber.viber',
	[WebchatAlternativeChannel.Whatsapp]:
		'objects.routing.chatGateways.webchat.alternativeChannels.whatsapp',
	[WebchatAlternativeChannel.Telegram]:
		'objects.routing.chatGateways.webchat.alternativeChannels.telegram',
	[WebchatAlternativeChannel.Messenger]:
		'objects.routing.chatGateways.webchat.alternativeChannels.messenger',
	[WebchatAlternativeChannel.Email]:
		'objects.routing.chatGateways.webchat.alternativeChannels.email',
};

/** [Claude] a channel without url can't stay enabled */
const setChannelUrl = (channel: WebchatAlternativeChannel, url: string) => {
	const alternativeChannel = metadata.value.alternativeChannels[channel];
	alternativeChannel.url = url;
	if (!url) alternativeChannel.enabled = false;
};

const searchCallFlows = (params: object) =>
	FlowsAPI.getLookup({
		...params,
		type: [
			EngineRoutingSchemaType.Voice,
			EngineRoutingSchemaType.Default,
		],
	});
</script>

<style scoped>
.opened-chat-gateway-webchat-alternative-channels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.opened-chat-gateway-webchat-alternative-channels__section {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
  gap: var(--spacing-sm);
}

.opened-chat-gateway-webchat-alternative-channels__channel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.opened-chat-gateway-webchat-alternative-channels__channel .copy-input {
  flex-grow: 1;
}

.opened-chat-gateway-webchat-alternative-channels__call-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
