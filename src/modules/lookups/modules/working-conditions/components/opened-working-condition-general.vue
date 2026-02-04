<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :model-value="itemInstance.name" required @update:model-value="setItemProp({ prop: 'name', value: $event })" />
      <wt-input-number :disabled="disableUserInput" :model-value="itemInstance.workdayHours" :v="v.itemInstance.workdayHours"
        :label="$t('objects.lookups.workingConditions.workdayDuration')" required
        @update:model-value="setItemProp({ prop: 'workdayHours', value: +$event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })" />
      <div>
        <wt-input-number :disabled="disableUserInput" :model-value="itemInstance.workdayPerMonth" :v="v.itemInstance.workdayPerMonth"
          :label="$t('objects.lookups.workingConditions.workdaysPerMonth')"
          @update:model-value="setItemProp({ prop: 'workdayPerMonth', value: +$event })" />

        <wt-input-number :disabled="disableUserInput" :model-value="itemInstance.pauseDuration" :v="v.itemInstance.pauseDuration"
          :label="$t('objects.lookups.workingConditions.pauseDuration')"
          @update:model-value="setItemProp({ prop: 'pauseDuration', value: +$event })" />
      </div>
      <wt-input-number :disabled="disableUserInput" :model-value="itemInstance.vacation" :v="v.itemInstance.vacation"
        :label="$t('objects.lookups.workingConditions.vacationDaysPerYear')"
        @update:model-value="setItemProp({ prop: 'vacation', value: +$event })" />
      <wt-select :value="itemInstance.pauseTemplate" :v="v.itemInstance.pauseTemplate"
        :label="$t('objects.lookups.pauseTemplates.pauseTemplates', 1)" required :search-method="loadPauseTemplate"
        @input="setItemProp({ prop: 'pauseTemplate', value: $event })" />
      <wt-input-number :disabled="disableUserInput" :model-value="itemInstance.sickLeaves" :v="v.itemInstance.sickLeaves"
        :label="$t('objects.lookups.workingConditions.sickLeavesPerYear')"
        @update:model-value="setItemProp({ prop: 'sickLeaves', value: +$event })" />
      <wt-select :search-method="loadShiftTemplate" :label="$t('objects.lookups.shiftTemplates.shiftTemplates', 1)"
        :value="itemInstance.shiftTemplate" @input="setItemProp({ prop: 'shiftTemplate', value: $event })" />
      <wt-input-number :disabled="disableUserInput" :model-value="itemInstance.daysOff" :v="v.itemInstance.daysOff"
        :label="$t('objects.lookups.workingConditions.daysOffPerYear')"
        @update:model-value="setItemProp({ prop: 'daysOff', value: +$event })" />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import PauseTemplatesAPI from '../../pause-templates/api/pauseTemplates.js';
import ShiftTemplatesAPI from '../../shift-templates/api/shiftTemplates.js';

export default {
  name: 'OpenedWorkingConditionGeneral',
  mixins: [openedTabComponentMixin],
  methods: {
    loadPauseTemplate(params) {
      return PauseTemplatesAPI.getLookup(params);
    },
    loadShiftTemplate(params) {
      return ShiftTemplatesAPI.getLookup(params);
    },
  },
};
</script>

<style scoped></style>
