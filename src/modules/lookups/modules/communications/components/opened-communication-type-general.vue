<template>
  <section>
    <div class="opened-card-input-grid opened-card-input-grid--1-col opened-card-input-grid--w50">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.channel"
        :disabled="!!modelValue.id || disableUserInput"
        :label="t('vocabulary.channel')"
        :options="channelOptions"
        :regle-validation="validationFields?.channel"
        required
        data-key="value"
        option-value="value"
      />
      <wt-input-text
        v-model:model-value="modelValue.code"
        :disabled="disableUserInput"
        :label="t('objects.lookups.communications.code')"
        :regle-validation="validationFields?.code"
        required
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	EngineCommunicationChannels,
	type EngineCommunicationType,
} from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineCommunicationType>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineCommunicationType>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();

const channelOptions = computed(() =>
	Object.values(EngineCommunicationChannels)
		.filter((channel) => channel !== EngineCommunicationChannels.Undefined)
		.map((channel) => ({
			name: t(`objects.lookups.communications.channels.${channel}`),
			value: channel,
		})),
);
</script>
