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
      <wt-single-select
        v-model:model-value="modelValue.type"
        :disabled="disableUserInput"
        :label="t('objects.integrations.triggers.type')"
        :options="typeOptions"
        :regle-validation="validationFields?.type"
        option-value="value"
        data-key="value"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.schema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.integrations.triggers.schema')"
        :regle-validation="validationFields?.schema"
        :search-method="hasFlowsReadAccess && searchFlows"
        required
      />
      <wt-single-select
        v-if="isCron"
        v-model:model-value="modelValue.timezone"
        :disabled="disableUserInput"
        :label="t('date.timezone', 1)"
        :regle-validation="validationFields?.timezone"
        :search-method="CalendarsAPI.getTimezonesLookup"
        required
      />
      <wt-single-select
        v-if="isEvent"
        :disabled="disableUserInput"
        :label="t('reusable.object')"
        :model-value="modelValue.object"
        :options="objectOptions"
        :regle-validation="validationFields?.object"
        option-value="value"
        data-key="value"
        required
        @update:model-value="setObject"
      />

      <wt-input-number
        v-model:model-value="modelValue.timeout"
        :disabled="disableUserInput"
        :label="t('objects.integrations.triggers.timeout')"
        :min="0"
        :regle-validation="validationFields?.timeout"
      />

      <wt-single-select
        v-if="isEvent"
        v-model:model-value="modelValue.event"
        :disabled="disableUserInput || !modelValue.object"
        :label="t('objects.integrations.triggers.eventSelect')"
        :options="eventOptions"
        :regle-validation="validationFields?.event"
        option-value="value"
        data-key="value"
        required
      />

      <div v-if="isCron">
        <wt-input-text
          v-model:model-value="modelValue.expression"
          :disabled="disableUserInput"
          :label="t('objects.integrations.triggers.expression')"
          :regle-validation="validationFields?.expression"
          required
        />
        <p
          v-show="!validationFields?.expression?.$error"
          class="opened-trigger-general__parsed-cron"
        >
          {{ parsedCron }}
        </p>
      </div>

      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import 'cronstrue/locales/en.min';
import 'cronstrue/locales/ru.min';
import 'cronstrue/locales/uk.min';

import { CalendarsAPI, FlowsAPI } from '@webitel/api-services/api';
import { EngineTriggerObjectType } from '@webitel/api-services/gen';
import {
	EngineRoutingSchemaType,
	EngineTriggerType,
} from '@webitel/api-services/gen/models';
import type { TriggerCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import cronstrue from 'cronstrue';
import { camelCase } from 'lodash-es';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { getTriggerEventOptions } from '../configs/triggerEvents';

const modelValue = defineModel<TriggerCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<TriggerCard>;
}>();

const { t, locale } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

/** [Claude] the trigger types, labelled the way the table shows them */
const typeOptions = [
	EngineTriggerType.Cron,
	EngineTriggerType.Event,
].map((value) => ({
	value,
	locale: `objects.integrations.triggers.${value}`,
}));

/** [Claude] the objects a trigger can watch, labelled by their camel-cased value */
const objectOptions = Object.values(EngineTriggerObjectType)
	.filter((value) => value !== EngineTriggerObjectType.EmptyTriggerObject)
	.map((value) => ({
		value,
		locale: `objects.integrations.triggers.${camelCase(value)}`,
	}));

const isCron = computed(() => modelValue.value.type === EngineTriggerType.Cron);
const isEvent = computed(
	() => modelValue.value.type === EngineTriggerType.Event,
);

const eventOptions = computed(() =>
	getTriggerEventOptions(modelValue.value.object),
);

const parsedCron = computed(() =>
	cronstrue.toString(modelValue.value.expression ?? '', {
		locale: locale.value,
		throwExceptionOnParseError: false,
	}),
);

/** [Claude] a trigger runs on service flows only */
const searchFlows = (params: object) =>
	FlowsAPI.getLookup({
		...params,
		type: [
			EngineRoutingSchemaType.Service,
		],
	});

/** [Claude] each object has its own events, so the picked one is chosen again */
const setObject = (object: TriggerCard['object']) => {
	modelValue.value.object = object;
	modelValue.value.event = undefined;
};
</script>

<style scoped>
.opened-trigger-general__parsed-cron {
  margin-top: var(--spacing-xs);
}
</style>
