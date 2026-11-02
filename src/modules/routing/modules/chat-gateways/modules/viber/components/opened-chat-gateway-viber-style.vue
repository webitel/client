<template>
  <section>
    <div class="opened-card-input-grid">
      <div
        v-for="prop of colorProps"
        :key="prop"
        class="opened-chat-gateway-viber-style__color-picker"
      >
        <wt-label>{{ t(`objects.routing.chatGateways.viber.style.${prop}`) }}</wt-label>
        <color-picker
          :value="modelValue.metadata[prop]"
          @input="modelValue.metadata[prop] = $event.hex"
        />
        <wt-button
          :color="ButtonColor.SECONDARY"
          @click="resetColor(prop)"
        >
          {{ t('vocabulary.reset') }}
        </wt-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getChatGatewayDefaults } from '@webitel/api-services/api';
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { Chrome as ColorPicker } from 'vue-color';
import { useI18n } from 'vue-i18n';

type ColorProp = 'btnBackColor' | 'btnFontColor';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

const { t } = useI18n();

const colorProps: ColorProp[] = [
	'btnBackColor',
	'btnFontColor',
];

const resetColor = (prop: ColorProp) => {
	const { metadata } = getChatGatewayDefaults(ChatGatewayProvider.VIBER);
	modelValue.value.metadata[prop] = (metadata as Record<ColorProp, string>)[
		prop
	];
};
</script>

<style scoped>
.opened-chat-gateway-viber-style__color-picker .wt-button {
  margin-top: var(--spacing-sm);
}

.opened-chat-gateway-viber-style__color-picker :deep(.vc-chrome-body) {
  background: var(--content-wrapper-color);
}
</style>
