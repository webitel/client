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
          :label="$tc('objects.lookups.blacklist.blacklist', 1)"
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
          :value="itemInstance.team"
          :v="v.itemInstance.team"
          :label="$tc('objects.ccenter.teams.teams', 1)"
          :search-method="loadDropdownOptionsTeamList"
          :clearable="true"
          :disabled="disableUserInput"
          @input="setItemProp({ prop: 'team', value: $event })"
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
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CalendarsAPI from '../../../../../lookups/modules/calendars/api/calendars';
import TeamsAPI from '../../../teams/api/teams';
import BlacklistsAPI from '../../../../../lookups/modules/blacklists/api/blacklists';
import { StrategyList } from '../../store/_internals/enums/Strategy.enum';

export default {
  name: 'opened-queue-chat-inbound-queue-general',
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
    loadDropdownOptionsTeamList(params) {
      return TeamsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
