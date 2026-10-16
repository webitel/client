<template>
  <section>
    <div class="opened-card-input-grid opened-card-input-grid--w50 opened-card-input-grid--1-col">
      <wt-switcher
        v-model:model-value="captcha.enabled"
        :disabled="disableUserInput"
        :label="t('objects.enabled')"
      />
      <wt-input-text
        v-model:model-value="captcha.sitekey"
        :disabled="disableCaptchaFields"
        :label="t('objects.routing.chatGateways.webchat.recaptcha.sitekey')"
        :regle-validation="captchaFields?.sitekey"
        required
      />
      <wt-input-text
        v-model:model-value="captcha.secret"
        :disabled="disableCaptchaFields"
        :label="t('objects.routing.chatGateways.webchat.recaptcha.secret')"
        :regle-validation="captchaFields?.secret"
        required
      />
      <wt-input-number
        v-model:model-value="captcha.threshold"
        :disabled="disableCaptchaFields"
        :label="t('objects.routing.chatGateways.webchat.recaptcha.threshold')"
        :max="1"
        :max-fraction-digits="2"
        :min="0"
        :regle-validation="captchaFields?.threshold"
        :step="0.1"
        required
      />
      <wt-switcher
        :disabled="disableCaptchaFields"
        :label="t('objects.routing.chatGateways.webchat.recaptcha.showFlag')"
        :model-value="!!captcha.showFlag"
        @update:model-value="captcha.showFlag = $event"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

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
const metadata = useWebchatMetadata(modelValue);

const captcha = computed(() => metadata.value.captcha);

const captchaFields = computed(
	() => props.validationFields?.metadata?.$fields?.captcha?.$fields,
);

const disableCaptchaFields = computed(
	() => !captcha.value.enabled || disableUserInput.value,
);
</script>
