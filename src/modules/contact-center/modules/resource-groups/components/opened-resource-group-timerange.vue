<template>
  <section class="opened-resource-group-timerange">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.ccenter.resGroups.timerange') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addRange"
      />
    </header>
    <div class="opened-card-input-grid">
      <div>
        <div
          v-for="(range, index) in modelValue.time"
          :key="index"
          class="opened-resource-group-timerange__range"
        >
          <wt-timepicker
            :disabled="disableUserInput"
            :label="t('objects.ccenter.resGroups.timerangeFrom')"
            :model-value="minToSec(range.start)"
            :regle-validation="getRangeValidation(index, 'start')"
            format="hh:mm"
            required
            @update:model-value="range.start = secToMin($event)"
          />
          <wt-timepicker
            :disabled="disableUserInput"
            :label="t('objects.ccenter.resGroups.timerangeTo')"
            :model-value="minToSec(range.end)"
            :regle-validation="getRangeValidation(index, 'end')"
            format="hh:mm"
            required
            @update:model-value="range.end = secToMin($event)"
          />
          <wt-icon-action
            v-if="index !== 0"
            :disabled="disableUserInput"
            action="delete"
            class="opened-resource-group-timerange__delete"
            @click="removeRange(index)"
          />
        </div>
      </div>
    </div>
  </section>
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

const addRange = () => {
	modelValue.value.time?.push(getDefaultResourceGroupTimeRange());
};

const removeRange = (index: number) => {
	modelValue.value.time?.splice(index, 1);
};
</script>

<style scoped>
.opened-resource-group-timerange__range {
  display: flex;
  align-items: start;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.opened-resource-group-timerange__delete {
  margin-top: var(--spacing-md);
}
</style>
