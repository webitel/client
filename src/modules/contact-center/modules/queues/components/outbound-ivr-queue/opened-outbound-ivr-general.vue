<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.calendar"
        :v="v.itemInstance.calendar"
        :label="$tc('objects.lookups.calendars.calendars', 1)"
        :search-method="loadDropdownOptionsCalendarList"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'calendar', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.dncList"
        :label="$t('objects.ccenter.queues.blacklist')"
        :search-method="loadDropdownOptionsBlacklistList"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'dncList', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.priority"
        :v="v.itemInstance.priority"
        :label="$t('objects.ccenter.queues.priority')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'priority', value: +$event })"
      ></wt-input>
      <wt-select
        v-model="strategy"
        :v="v.itemInstance.strategy"
        :label="$t('objects.ccenter.queues.strategy')"
        :options="dropdownOptionsStrategyList"
        :clearable="false"
        track-by="value"
        :disabled="disableUserInput"
        required
      ></wt-select>
      <wt-select
        :value="itemInstance.schema"
        :v="v.itemInstance.schema"
        :label="$t('objects.routing.schema')"
        :search-method="loadDropdownOptionsSchemaList"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.doSchema"
        :label="$t('objects.ccenter.queues.preSchema')"
        :search-method="loadDropdownOptionsSchemaList"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'doSchema', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.afterSchema"
        :label="$t('objects.ccenter.queues.afterSchema')"
        :search-method="loadDropdownOptionsSchemaList"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'afterSchema', value: $event })"
      ></wt-select>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { StrategyList } from '../../store/_internals/enums/Strategy.enum';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CalendarsAPI from '../../../../../lookups/modules/calendars/api/calendars';
import BlacklistsAPI from '../../../../../lookups/modules/blacklists/api/blacklists';
import FlowsAPI from '../../../../../routing/modules/flow/api/flow';

export default {
  name: 'opened-outbound-ivr-general',
  mixins: [openedTabComponentMixin],
  computed: {
    strategy: {
      get() {
        return this.dropdownOptionsStrategyList
          .find((strategy) => strategy.value === this.itemInstance.strategy);
      },
      set(value) {
        this.setItemProp({ prop: 'strategy', value: value.value });
      },
    },

    dropdownOptionsStrategyList() {
      return StrategyList.map((strategy) => ({
        value: strategy.value,
        name: this.$t(`objects.ccenter.queues.queueStrategy.${strategy.value}`),
      }));
    },
  },

  methods: {
    loadDropdownOptionsCalendarList(params) {
      return CalendarsAPI.getLookup(params);
    },
    loadDropdownOptionsBlacklistList(params) {
      return BlacklistsAPI.getLookup(params);
    },
    loadDropdownOptionsSchemaList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
