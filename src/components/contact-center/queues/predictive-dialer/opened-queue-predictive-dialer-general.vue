<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="calendar"
        :v="v.itemInstance.calendar"
        :label="$tc('objects.lookups.calendars.calendars', 1)"
        :search="loadDropdownOptionsCalendarList"
        :internal-search="false"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'calendar', value: $event })"
      ></wt-select>
      <wt-select
        :value="dncList"
        :label="$tc('objects.lookups.blacklist.blacklist', 1)"
        :search="loadDropdownOptionsBlacklistList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'dncList', value: $event })"
      ></wt-select>
      <wt-input
        :value="priority"
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
        :value="team"
        :v="v.itemInstance.team"
        :label="$tc('objects.ccenter.teams.teams', 1)"
        :search="loadDropdownOptionsTeamList"
        :internal-search="false"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'team', value: $event })"
      ></wt-select>
      <wt-select
        :value="doSchema"
        :label="$t('objects.ccenter.queues.preSchema')"
        :search="loadDropdownOptionsSchemaList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'doSchema', value: $event })"
      ></wt-select>
      <wt-select
        :value="afterSchema"
        :label="$t('objects.ccenter.queues.afterSchema')"
        :search="loadDropdownOptionsSchemaList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'afterSchema', value: $event })"
      ></wt-select>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getCalendarList } from '../../../../api/lookups/calendars/calendars';
import { getBlacklistList } from '../../../../api/lookups/blacklists/blacklists';
import { getTeamsList } from '../../../../api/contact-center/teams/teams';
import { getFlowList } from '../../../../api/routing/flow/flow';
import { StrategyList } from '../../../../store/modules/contact-center/queues/_internals/enums/Strategy.enum';
import openedTabComponentMixin from '../../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-offline-queue-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues', {
      name: (state) => state.itemInstance.name,
      calendar: (state) => state.itemInstance.calendar,
      dncList: (state) => state.itemInstance.dncList,
      priority: (state) => state.itemInstance.priority,
      description: (state) => state.itemInstance.description,
      strategyValue: (state) => state.itemInstance.strategy,
      team: (state) => state.itemInstance.team,
      doSchema: (state) => state.itemInstance.doSchema,
      afterSchema: (state) => state.itemInstance.afterSchema,
    }),

    strategy: {
      get() {
        return this.dropdownOptionsStrategyList
          .find((strategy) => strategy.value === this.strategyValue);
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
    async loadDropdownOptionsCalendarList(search) {
      const response = await getCalendarList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsBlacklistList(search) {
      const response = await getBlacklistList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsTeamList(search) {
      const response = await getTeamsList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    async loadDropdownOptionsSchemaList(search) {
      const response = await getFlowList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },

    ...mapActions('ccenter/queues', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
