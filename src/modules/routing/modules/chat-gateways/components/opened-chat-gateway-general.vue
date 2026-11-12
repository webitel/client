<template>
  <section>
    <header class="opened-card-header">
      <wt-icon
        v-if="headerIcon"
        v-bind="headerIcon"
      />
      <h3 class="opened-card-header__title">
        {{ t(headerTitle) }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <template
        v-for="field of config.fields"
        :key="field.prop"
      >
        <wt-input-text
          v-if="field.type === 'uri'"
          v-model:model-value="modelValue.uri"
          :disabled="!isUriEditable"
          :label="t('objects.routing.chatGateways.uri')"
          :regle-validation="validationFields?.uri"
          required
        >
          <template #suffix>
            <wt-copy-action :value="modifyUriCopy(modelValue.uri ?? '')" />
          </template>
        </wt-input-text>
        <wt-single-select
          v-else-if="field.type === 'flow'"
          :disabled="disableUserInput || !hasFlowsReadAccess"
          :label="t('objects.routing.flow.flow', 1)"
          :model-value="modelValue.flow"
          :regle-validation="validationFields?.flow"
          :search-method="hasFlowsReadAccess && FlowsAPI.getLookup"
          required
          @update:model-value="setFlow"
        />
        <wt-password
          v-else-if="field.type === 'generate'"
          :actions="[
            PasswordAction.Copy,
            PasswordAction.Generate,
            PasswordAction.Toggle,
          ]"
          :disabled="disableUserInput"
          :generator="generateSecret"
          :label="fieldLabel(field)"
          :label-props="fieldLabelProps(field)"
          :model-value="String(metadata[field.prop] ?? '')"
          :placeholder="fieldLabel(field)"
          :regle-validation="validationFields?.metadata?.$fields?.[field.prop]"
          :required="field.required"
          hide-hash
          @update:model-value="metadata[field.prop] = $event"
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
import {
	PasswordAction,
	PasswordCategories,
	WtObject,
} from '@webitel/ui-sdk/enums';
import { generatePassword } from '@webitel/ui-sdk/scripts';
import path from 'path';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

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

/** [Claude] each provider's general tab is titled (and iconed) after the provider, a custom one just "General" */
const providerHeaders: Partial<
	Record<
		ChatGatewayProvider,
		{
			title: string;
			icon?: {
				icon: string;
				iconPrefix?: string;
				size: string;
			};
		}
	>
> = {
	[ChatGatewayProvider.INFOBIP]: {
		title: 'objects.routing.chatGateways.infobip.infobip',
		icon: {
			icon: 'infobip',
			iconPrefix: 'messenger',
			size: 'sm',
		},
	},
	[ChatGatewayProvider.MESSENGER]: {
		title: 'objects.routing.chatGateways.messenger.meta',
		icon: {
			icon: 'meta',
			size: 'md',
		},
	},
	[ChatGatewayProvider.TELEGRAM_APP]: {
		title: 'objects.routing.chatGateways.telegramApp.telegramApp',
		icon: {
			icon: 'telegram',
			iconPrefix: 'messenger',
			size: 'sm',
		},
	},
	[ChatGatewayProvider.TELEGRAM_BOT]: {
		title: 'objects.routing.chatGateways.telegramBot.telegramBot',
		icon: {
			icon: 'telegram',
			iconPrefix: 'messenger',
			size: 'sm',
		},
	},
	[ChatGatewayProvider.VIBER]: {
		title: 'objects.routing.chatGateways.viber.viber',
		icon: {
			icon: 'viber',
			iconPrefix: 'messenger',
			size: 'sm',
		},
	},
	[ChatGatewayProvider.CUSTOM]: {
		title: 'objects.routing.chatGateways.customChat.customChat',
		icon: {
			icon: 'custom-chat-gateway',
			size: 'sm',
		},
	},
};

const providerHeader = computed(() =>
	modelValue.value.provider
		? providerHeaders[modelValue.value.provider as ChatGatewayProvider]
		: undefined,
);
const headerTitle = computed(
	() => providerHeader.value?.title ?? 'objects.general',
);
const headerIcon = computed(() => providerHeader.value?.icon);

/** [Claude] the uri is set once on create, then read-only */
const isUriEditable = computed(
	() => !disableUserInput.value && !modelValue.value.id,
);

/** [Claude] app secret keeps its old format: 16 letters and digits, no special chars */
const generateSecret = () =>
	generatePassword({
		length: 16,
		categories: [
			PasswordCategories.Lowercase,
			PasswordCategories.Uppercase,
			PasswordCategories.Digits,
		],
	});

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
