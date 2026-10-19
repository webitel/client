<template>
  <section class="opened-chat-gateway-webchat-view">
    <section class="opened-chat-gateway-webchat-view__preview">
      <div id="chat-preview" />
      <section class="opened-chat-gateway-webchat-view__button-preview">
        <div id="chat-button-preview" />
      </section>
    </section>
    <section class="opened-chat-gateway-webchat-view__config">
      <div class="opened-card-input-grid opened-card-input-grid--1-col">
        <wt-single-select
          v-model:model-value="language"
          :show-clear="false"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.view.language')"
          :options="languages"
          data-key="name"
        />
        <wt-single-select
          v-model:model-value="position"
          :show-clear="false"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.view.position')"
          :options="positionOptions"
          data-key="name"
        />
        <wt-single-select
          v-model:model-value="borderRadius"
          :show-clear="false"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.view.borderRadius')"
          :options="borderRadiusOptions"
          data-key="name"
        />
        <wt-input-text
          v-model:model-value="metadata.view.logoUrl"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.view.logoUrl')"
          :label-props="{
            hint: t('objects.routing.chatGateways.webchat.view.logoHint'),
            hintPosition: 'right',
          }"
          :regle-validation="validationFields?.metadata?.$fields?.view?.$fields?.logoUrl"
        />
        <section class="opened-chat-gateway-webchat-view__color">
          <wt-label>
            {{ t('objects.routing.chatGateways.webchat.view.btnColor') }}
          </wt-label>
          <color-picker
            :value="color"
            class="opened-chat-gateway-webchat-view__color-picker"
            @input="setColor"
          />
        </section>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { Chrome as ColorPicker } from 'vue-color';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import type { ChatGatewayValidationFields } from '../../../types/ChatGatewayValidationFields';
import { useWebchatPreview } from '../composables/useWebchatPreview';
import { useWebchatViewForm } from '../composables/useWebchatViewForm';
import { useWebchatMetadata } from '../types/WebchatMetadata';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

defineProps<{
	validationFields?: ChatGatewayValidationFields;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const metadata = useWebchatMetadata(modelValue);

const {
	languages,
	borderRadiusOptions,
	positionOptions,
	language,
	position,
	borderRadius,
	color,
	setColor,
} = useWebchatViewForm(metadata);

useWebchatPreview(metadata, {
	chatSelector: '#chat-preview',
	buttonSelector: '#chat-button-preview',
});
</script>

<style scoped>
.opened-chat-gateway-webchat-view {
  display: flex;
  width: 50%;
  min-width: 760px;
  gap: var(--spacing-sm);
}

.opened-chat-gateway-webchat-view__preview {
  display: flex;
  flex-basis: max-content;
  flex-direction: column;
}

/* [Claude] rendered by the omni widget, not by this template */
.opened-chat-gateway-webchat-view__preview :deep(#wt-omni-widget.wt-omni-widget--position-static) {
  z-index: 1;
}

.opened-chat-gateway-webchat-view__button-preview {
  position: relative;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-top: var(--spacing-sm);
}

/* [Claude] a checkered backdrop, so the transparent button can be seen */
.opened-chat-gateway-webchat-view__button-preview::after {
  position: absolute;
  inset: 0;
  content: '';
  opacity: 0.3;
  background: url('../../../assets/transparent-img.svg') repeat;
}

.opened-chat-gateway-webchat-view__config {
  width: 50%;
}

.opened-chat-gateway-webchat-view__color {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.opened-chat-gateway-webchat-view__color-picker {
  width: 100%;
}
</style>
