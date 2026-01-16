<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :value="itemInstance.name" required @input="setItemProp({ prop: 'name', value: $event })" />
      <wt-input :disabled="disableUserInput" :value="itemInstance.workdayHours" :v="v.itemInstance.workdayHours"
        :label="$t('objects.lookups.workingConditions.workdayDuration')" type="number" required
        @input="setItemProp({ prop: 'workdayHours', value: +$event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })" />
      <div>
        <wt-input :disabled="disableUserInput" :value="itemInstance.workdayPerMonth" :v="v.itemInstance.workdayPerMonth"
          :label="$t('objects.lookups.workingConditions.workdaysPerMonth')" type="number"
          @input="setItemProp({ prop: 'workdayPerMonth', value: +$event })" />

        <wt-input :disabled="disableUserInput" :value="itemInstance.pauseDuration" :v="v.itemInstance.pauseDuration"
          :label="$t('objects.lookups.workingConditions.pauseDuration')" type="number"
          @input="setItemProp({ prop: 'pauseDuration', value: +$event })" />
      </div>
      <wt-input :disabled="disableUserInput" :value="itemInstance.vacation" :v="v.itemInstance.vacation"
        :label="$t('objects.lookups.workingConditions.vacationDaysPerYear')" type="number"
        @input="setItemProp({ prop: 'vacation', value: +$event })" />
      <wt-select :value="itemInstance.pauseTemplate" :v="v.itemInstance.pauseTemplate"
        :label="$t('objects.lookups.pauseTemplates.pauseTemplates', 1)" required :search-method="loadPauseTemplate"
        @input="setItemProp({ prop: 'pauseTemplate', value: $event })" />
      <wt-input :disabled="disableUserInput" :value="itemInstance.sickLeaves" :v="v.itemInstance.sickLeaves"
        :label="$t('objects.lookups.workingConditions.sickLeavesPerYear')" type="number"
        @input="setItemProp({ prop: 'sickLeaves', value: +$event })" />
      <wt-select :search-method="loadShiftTemplate" :label="$t('objects.lookups.shiftTemplates.shiftTemplates', 1)"
        :value="itemInstance.shiftTemplate" @input="setItemProp({ prop: 'shiftTemplate', value: $event })" />
      <wt-input :disabled="disableUserInput" :value="itemInstance.daysOff" :v="v.itemInstance.daysOff"
        :label="$t('objects.lookups.workingConditions.daysOffPerYear')" type="number"
        @input="setItemProp({ prop: 'daysOff', value: +$event })" />
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
