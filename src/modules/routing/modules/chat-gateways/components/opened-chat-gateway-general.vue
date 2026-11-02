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
      <copy-input
        v-model="modelValue.uri"
        v-if="config.hasUri !== false"
        :copy-modifier="modifyUriCopy"
        :disabled="!isUriEditable"
        :label="t('objects.routing.chatGateways.uri')"
        :regle-validation="validationFields?.uri"
        required
      />
      <wt-single-select
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.routing.flow.flow', 1)"
        :model-value="modelValue.flow"
        :regle-validation="validationFields?.flow"
        :search-method="hasFlowsReadAccess && FlowsAPI.getLookup"
        required
        @update:model-value="setFlow"
      />
      <template
        v-for="field of config.fields"
        :key="field.prop"
      >
        <generate-value-input
          v-if="field.type === 'generate'"
          :disabled="disableUserInput"
          :label="fieldLabel(field)"
          :label-props="fieldLabelProps(field)"
          :placeholder="fieldLabel(field)"
          :regle-validation="validationFields?.metadata?.$fields?.[field.prop]"
          :required="field.required"
          :value="String(metadata[field.prop] ?? '')"
          @input="metadata[field.prop] = $event"
        />
        <wt-input-text
          v-else
          v-model:model-value="metadata[field.prop]"
          :disabled="disableUserInput"
          :label="fieldLabel(field)"
          :label-props="fieldLabelProps(field)"
          :regle-validation="validationFields?.metadata?.$fields?.[field.prop]"
          :required="field.required"
          :type="field.type"
        />
      </template>
      <opened-chat-gateway-telegram-app-button
        v-if="isTelegramApp && modelValue.id"
        :uri="modelValue.uri"
        class="opened-chat-gateway-general__telegram-app-button"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { FlowsAPI } from '@webitel/api-services/api';
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { WtObject } from '@webitel/ui-sdk/enums';
import path from 'path';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import GenerateValueInput from '../../../../../app/components/utils/generate-value-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import {
	type ChatGatewayGeneralConfig,
	type ChatGatewayGeneralField,
	chatGatewayGeneralFields,
} from '../configs/chatGatewayGeneralFields';
import OpenedChatGatewayTelegramAppButton from '../modules/telegram-app/components/opened-chat-gateway-telegram-app-button.vue';
import type { ChatGatewayValidationFields } from '../types/ChatGatewayValidationFields';

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

/** [Claude] the uri is copied as the full chat url rather than the bare path */
const modifyUriCopy = (value: string) =>
	new URL(
		path.join(import.meta.env.VITE_CHAT_URL, value),
		window.location.origin,
	).toString();

const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

/** [Claude] an unnamed gateway takes the flow's name */
const setFlow = (value: ChatGatewayCard['flow']) => {
	if (!modelValue.value.name && value?.name) {
		modelValue.value.name = value.name;
	}
	modelValue.value.flow = value;
};

const config = computed<ChatGatewayGeneralConfig>(
	() =>
		chatGatewayGeneralFields[modelValue.value.provider ?? ''] ?? {
			fields: [],
		},
);

const metadata = computed(
	() => modelValue.value.metadata as Record<string, string | number | null>,
);

const isTelegramApp = computed(
	() => modelValue.value.provider === ChatGatewayProvider.TELEGRAM_APP,
);

const fieldLabel = ({ label }: ChatGatewayGeneralField) =>
	Array.isArray(label) ? t(...label) : t(label);

const fieldLabelProps = ({ hint, type }: ChatGatewayGeneralField) =>
	hint
		? {
				hint: t(hint),
				hintPosition: type === 'generate' ? 'right' : undefined,
			}
		: undefined;
</script>

<style scoped>
.opened-chat-gateway-general__telegram-app-button {
  grid-column: 1 / -1;
  margin: auto;
}
</style>
