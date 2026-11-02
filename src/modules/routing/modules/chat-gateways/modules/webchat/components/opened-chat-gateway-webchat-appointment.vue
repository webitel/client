<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-switcher
        v-model:model-value="appointment.enabled"
        :disabled="disableUserInput"
        :label="t('objects.enabled')"
      />
      <div />
      <wt-single-select
        v-model:model-value="appointment.queue"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.queues', 1)"
        :regle-validation="appointmentFields?.queue"
        :required="appointment.enabled"
        :search-method="QueuesAPI.getLookup"
        :show-clear="false"
      />
      <wt-single-select
        v-model:model-value="appointment.communicationType"
        :disabled="disableUserInput"
        :label="t('objects.lookups.communications.communications', 1)"
        :regle-validation="appointmentFields?.communicationType"
        :required="appointment.enabled"
        :search-method="CommunicationsAPI.getLookup"
        :show-clear="false"
      />
      <wt-single-select
        v-model:model-value="appointment.duration"
        :disabled="disableUserInput"
        :label="t('vocabulary.duration')"
        :options="durationOptions"
        :regle-validation="appointmentFields?.duration"
        :required="appointment.enabled"
        :show-clear="false"
        data-key="value"
        option-value="value"
      />
      <wt-input-number
        v-model:model-value="appointment.availableAgents"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.webchat.appointment.availableAgents')"
        :min="1"
        :regle-validation="appointmentFields?.availableAgents"
        :required="appointment.enabled"
      />
      <wt-input-number
        v-model:model-value="appointment.days"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.webchat.appointment.days')"
        :max="7"
        :min="1"
        :regle-validation="appointmentFields?.days"
        :required="appointment.enabled"
      />
      <wt-switcher
        v-model:model-value="appointment.showMessageField"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.webchat.appointment.showMessageField')"
      />
      <div class="opened-chat-gateway-webchat-appointment__success-settings">
        <span class="typo-heading-3">
          {{ t('objects.routing.chatGateways.webchat.appointment.resultPageText') }}
        </span>
        <wt-switcher
          v-model:model-value="appointment.showDefaultHeading"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.appointment.showDefaultHeading')"
        />
        <wt-textarea
          :disabled="appointment.showDefaultHeading || disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.appointment.headingText')"
          :model-value="appointment.successTitle"
          @update:model-value="appointment.successTitle = normalizeText($event)"
        />
        <wt-textarea
          :disabled="appointment.showDefaultHeading || disableUserInput"
          :label="t('objects.routing.chatGateways.webchat.appointment.subheadingText')"
          :model-value="appointment.successSubtitle"
          @update:model-value="appointment.successSubtitle = normalizeText($event)"
        />
      </div>
      <wt-switcher
        v-model:model-value="appointment.showEmailField"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.webchat.appointment.showEmailField')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { CommunicationsAPI, QueuesAPI } from '@webitel/api-services/api';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import StatisticTimeList from '../../../../../../contact-center/modules/queues/lookups/StatisticTime.lookup';
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

const appointment = computed(() => metadata.value.appointment);

const appointmentFields = computed(
	() => props.validationFields?.metadata?.$fields?.appointment?.$fields,
);

const durationOptions = computed(() =>
	StatisticTimeList.slice(0, 4).map((time) => ({
		value: `${time.value}m`,
		name: t(`reusable.time.${time.name}`),
	})),
);

/** [Claude] no leading spaces and no runs of spaces in the success page texts */
const normalizeText = (value: string) =>
	value.trimStart().replace(/\s{2,}/g, ' ');
</script>

<style scoped>
.opened-chat-gateway-webchat-appointment__success-settings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
