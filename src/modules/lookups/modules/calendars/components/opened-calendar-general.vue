<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="props.validationFields?.name"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.timezone"
        :show-clear="false"
        :disabled="disableUserInput"
        :label="t('objects.lookups.calendars.timezone')"
        :search-method="CalendarsAPI.getTimezonesLookup"
        :regle-validation="timezoneRegleValidation"
        required
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
      <wt-switcher
        v-model:model-value="modelValue.expires"
        :disabled="disableUserInput"
        :label="t('objects.lookups.calendars.fulltime')"
      />
      <wt-datepicker
        v-show="modelValue.expires"
        v-model:model-value="modelValue.startAt"
        :disabled="disableUserInput"
        :label="t('objects.lookups.calendars.start')"
      />
      <wt-datepicker
        v-show="modelValue.expires"
        v-model:model-value="modelValue.endAt"
        :disabled="disableUserInput"
        :label="t('objects.lookups.calendars.end')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { CalendarsAPI } from '@webitel/api-services/api';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { CalendarCard } from '../stores';

const modelValue = defineModel<CalendarCard>({
	required: true,
});

const props = defineProps<{
	validationFields?: {
		[K in keyof CalendarCard]?: RegleSchemaFieldStatus<CalendarCard[K]>;
	};
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const timezoneRegleValidation = computed(() => {
	const timezone = props.validationFields?.timezone as
		| {
				$fields?: {
					id?: RegleSchemaFieldStatus<string>;
				};
		  }
		| undefined;

	return timezone?.$fields?.id;
});
</script>
