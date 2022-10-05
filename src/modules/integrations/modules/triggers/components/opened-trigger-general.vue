<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.triggers.type')"
        :options="TriggerTypes"
        :v="v.itemInstance.type"
        :value="itemInstance.type"
        track-by="value"
        @input="setItemProp({ prop: 'type', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.schema"
        :v="v.itemInstance.schema"
        :label="$tc('objects.integrations.triggers.schema')"
        :clearable="false"
        :search-method="loadDropdownOptionsList"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.timezone"
        :v="v.itemInstance.timezone"
        :label="$tc('date.timezone', 1)"
        :search-method="loadTimezones"
        :disabled="disableUserInput"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'timezone', value: $event })"
      ></wt-select>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CalendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import TriggerTypes from '../lookups/TriggerTypes.lookup';

export default {
  name: 'opened-trigger-general',
  mixins: [openedTabComponentMixin],
  data: () => ({
    TriggerTypes,
  }),
  methods: {
    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
    loadTimezones(params) {
      return CalendarsAPI.getTimezonesLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
