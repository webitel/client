<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-multi-select
        v-model:model-value="metadata.allowOrigin"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.metadata.allowOrigin')"
        :options="metadata.allowOrigin"
        chips-view
        allow-custom-values
        :data-key="null"
      />
      <copy-input
        v-model="modelValue.uri"
        :copy-modifier="modifyUriCopy"
        :disabled="!isUriEditable"
        :label="t('objects.routing.chatGateways.uri')"
        :regle-validation="validationFields?.uri"
        required
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import path from 'path';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CopyInput from '../../../../../../../app/components/utils/copy-input.vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import type { ChatGatewayValidationFields } from '../../../types/ChatGatewayValidationFields';
import { useWebchatMetadata } from '../types/WebchatMetadata';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

defineProps<{
	validationFields?: ChatGatewayValidationFields;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
/** [Claude] the uri is set once on create, then read-only */
const isUriEditable = computed(
	() => !disableUserInput.value && !modelValue.value.id,
);
const metadata = useWebchatMetadata(modelValue);

/** [Claude] the widget connects over a websocket, so its uri is copied as a ws url */
const modifyUriCopy = (value: string) =>
	new URL(
		path.join(import.meta.env.VITE_CHAT_URL, value),
		window.location.origin.replace('http', 'ws'),
	).toString();
</script>
