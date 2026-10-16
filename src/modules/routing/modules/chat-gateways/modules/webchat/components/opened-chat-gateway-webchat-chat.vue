<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-switcher
        v-model:model-value="metadata.chat.enabled"
        :disabled="disableUserInput"
        :label="t('objects.enabled')"
      />
      <div />
      <wt-input-number
        v-model:model-value="metadata.readTimeout"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.metadata.readTimeout')"
        :regle-validation="metadataFields?.readTimeout"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.routing.flow.flow', 1)"
        :model-value="modelValue.flow"
        :regle-validation="validationFields?.flow"
        :required="metadata.chat.enabled"
        :search-method="hasFlowsReadAccess && searchFlows"
        @update:model-value="setFlow"
      />
      <wt-input-number
        v-model:model-value="metadata.writeTimeout"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.metadata.writeTimeout')"
        :regle-validation="metadataFields?.writeTimeout"
      />
      <wt-input-number
        v-model:model-value="metadata.handshakeTimeout"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.metadata.handshakeTimeout')"
        :regle-validation="metadataFields?.handshakeTimeout"
      />
      <wt-switcher
        v-model:model-value="metadata.chat.timeoutIsActive"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.webchat.chat.openTimeout')"
      />
      <wt-input-number
        v-model:model-value="metadata.chat.openTimeout"
        :disabled="disableUserInput || !metadata.chat.timeoutIsActive"
        :label="t('objects.routing.chatGateways.webchat.chat.openTimeoutSec')"
        :regle-validation="metadataFields?.chat?.$fields?.openTimeout"
      />
      <wt-input-number
        v-model:model-value="mediaMaxSize"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.webchat.metadata.mediaMaxSize')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useChatGatewayFlow } from '../../../composables/useChatGatewayFlow';
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
const { hasFlowsReadAccess, searchFlows, setFlow } =
	useChatGatewayFlow(modelValue);
const metadata = useWebchatMetadata(modelValue);

const metadataFields = computed(
	() => props.validationFields?.metadata?.$fields,
);

const BYTES_IN_MB = 1024 * 1024;

/** [Claude] the max file size is stored in bytes, as a string, and edited in megabytes */
const mediaMaxSize = computed({
	get: () => Number(metadata.value.mediaMaxSize || 0) / BYTES_IN_MB,
	set: (value: number | null) => {
		metadata.value.mediaMaxSize = `${(value || 0) * BYTES_IN_MB}`;
	},
});
</script>
