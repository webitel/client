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
        :search-method="hasFlowsReadAccess && searchFlows"
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
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CopyInput from '../../../../../app/components/utils/copy-input.vue';
import GenerateValueInput from '../../../../../app/components/utils/generate-value-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useChatGatewayFlow } from '../composables/useChatGatewayFlow';
import { useChatGatewayUri } from '../composables/useChatGatewayUri';
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
const { isUriEditable, modifyUriCopy } = useChatGatewayUri(modelValue);
const { hasFlowsReadAccess, searchFlows, setFlow } =
	useChatGatewayFlow(modelValue);

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
