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
        :label="$tc('objects.lookups.calendars.calendars', 1)"
        :search-method="loadDropdownOptionsCalendarList"
        :v="v.itemInstance.calendar"
        :value="itemInstance.calendar"
        required
        @input="setItemProp({ prop: 'calendar', value: $event })"
      ></wt-select>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.blacklist')"
        :search-method="loadDropdownOptionsBlacklistList"
        :value="itemInstance.dncList"
        @input="setItemProp({ prop: 'dncList', value: $event })"
      ></wt-select>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.priority')"
        :value="itemInstance.priority"
        type="number"
        @input="setItemProp({ prop: 'priority', value: +$event })"
      ></wt-input>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.strategy"
        v-model="strategy"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.strategy')"
        :options="dropdownOptionsStrategyList"
        :v="v.itemInstance.strategy"
        required
        track-by="value"
      ></wt-select>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.team"
        :clearable="true"
        :disabled="disableUserInput"
        :label="$tc('objects.ccenter.teams.teams', 1)"
        :search-method="loadDropdownOptionsTeamList"
        :v="v.itemInstance.team"
        :value="itemInstance.team"
        @input="setItemProp({ prop: 'team', value: $event })"
      ></wt-select>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.ringtone"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.ringtone')"
        :search-method="loadDropdownOptionsMediaList"
        :value="itemInstance.ringtone"
        @input="setItemProp({ prop: 'ringtone', value: $event })"
      ></wt-select>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.schema"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$tc('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsSchemaList"
        :v="v.itemInstance.schema"
        :value="itemInstance.schema"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.doSchema"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.preSchema')"
        :search-method="loadDropdownOptionsSchemaList"
        :value="itemInstance.doSchema"
        @input="setItemProp({ prop: 'doSchema', value: $event })"
      ></wt-select>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.afterSchema"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.afterSchema')"
        :search-method="loadDropdownOptionsSchemaList"
        :value="itemInstance.afterSchema"
        @input="setItemProp({ prop: 'afterSchema', value: $event })"
      ></wt-select>

      <!--      v-if-->
      <wt-select
        v-if="specificControls.grantee"
        :clearable="true"
        :disabled="disableUserInput"
        :label="$t('objects.permissions.object.grantee')"
        :search-method="loadDropdownOptionsRoleList"
        :value="itemInstance.grantee"
        @input="setItemProp({ prop: 'grantee', value: $event })"
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
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import CalendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import BlacklistsAPI from '../../../../lookups/modules/blacklists/api/blacklists';
import MediaAPI from '../../../../lookups/modules/media/api/media';
import TeamsAPI from '../../teams/api/teams';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';
import { StrategyList } from '../store/_internals/enums/Strategy.enum';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-general',
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
    specificControls() {
      return QueueTypeProperties[this.itemInstance.type].controls
                                                        .reduce((controls, control) => ({
                                                          ...controls,
                                                          [control]: true,
                                                        }), {});
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
    loadDropdownOptionsSchemaList(params) {
      return FlowsAPI.getLookup(params);
    },
    loadDropdownOptionsMediaList(params) {
      return MediaAPI.getLookup(params);
    },
    loadDropdownOptionsRoleList(params) {
      return RolesAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
