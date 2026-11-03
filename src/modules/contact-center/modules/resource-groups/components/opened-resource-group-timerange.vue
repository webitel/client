<template>
  <wt-editable-list
    v-model:model-value="modelValue.time"
    :create-row="getDefaultResourceGroupTimeRange"
    :disabled="disableUserInput"
    :headers="headers"
  >
    <template #title>
      <h3 class="table-title__title">
        {{ t('objects.ccenter.resGroups.timerange') }}
      </h3>
    </template>
    <template #start="{ item, index }">
      <wt-timepicker
        :disabled="disableUserInput"
        :model-value="minToSec(item.start)"
        :regle-validation="getRangeValidation(index, 'start')"
        format="hh:mm"
        no-label
        @update:model-value="item.start = secToMin($event)"
      />
    </template>
    <template #end="{ item, index }">
      <wt-timepicker
        :disabled="disableUserInput"
        :model-value="minToSec(item.end)"
        :regle-validation="getRangeValidation(index, 'end')"
        format="hh:mm"
        no-label
        @update:model-value="item.end = secToMin($event)"
      />
    </template>
  </wt-editable-list>
</template>

<script setup lang="ts">
import { minToSec, secToMin } from '@webitel/api-services/scripts';
import {
	getDefaultResourceGroupTimeRange,
	getResourceGroupTimeRangeErrors,
} from '@webitel/api-services/validations';
import {
	type CardValidationFields,
	useTimeRangesValidation,
} from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { ResourceGroupCard } from '../stores/card/resourceGroupsCardStore';

const modelValue = defineModel<ResourceGroupCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<ResourceGroupCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const { getRangeValidation } = useTimeRangesValidation(
	() => modelValue.value.time,
	getResourceGroupTimeRangeErrors,
);

const headers = computed(() => [
	{
		value: 'start',
		text: t('objects.ccenter.resGroups.timerangeFrom'),
	},
	{
		value: 'end',
		text: t('objects.ccenter.resGroups.timerangeTo'),
	},
]);
</script>
