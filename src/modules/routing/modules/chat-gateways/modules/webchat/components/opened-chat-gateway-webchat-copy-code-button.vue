<template>
  <wt-button
    :color="color"
    @click="copyCode"
  >
    {{ copied ? t('objects.copied') : t('objects.routing.chatGateways.webchat.copyCode') }}
    <wt-hint
      v-show="!copied"
      :icon-color="`on-${color}`"
    >
      {{ t('objects.routing.chatGateways.webchat.copyCodeHint') }}
    </wt-hint>
  </wt-button>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { generateWidgetCode } from '../scripts/generateWidgetCode';
import type { WebchatMetadata } from '../types/WebchatMetadata';

const props = defineProps<{
	itemInstance: ChatGatewayCard;
}>();

const emit = defineEmits<{
	copied: [];
}>();

const { t } = useI18n();
const { copy, copied } = useClipboard({
	copiedDuring: 1500,
	legacy: true,
});

const metadata = computed(
	() => props.itemInstance.metadata as unknown as WebchatMetadata,
);

/** [Claude] highlighted while the code on the client's site is outdated */
const color = computed(() =>
	metadata.value._btnCodeDirty ? ButtonColor.PRIMARY : ButtonColor.SECONDARY,
);

const copyCode = async () => {
	await copy(
		generateWidgetCode(
			{
				uri: props.itemInstance.uri ?? '',
				metadata: metadata.value,
			},
			{
				// [Claude] the widget is served by the services host: the app's own in production, the api's in dev
				servicesOrigin: import.meta.env.PROD
					? window.location.origin
					: new URL(import.meta.env.VITE_API_URL).origin,
				chatPath: import.meta.env.VITE_CHAT_URL,
			},
		),
	);
	emit('copied');
};
</script>

