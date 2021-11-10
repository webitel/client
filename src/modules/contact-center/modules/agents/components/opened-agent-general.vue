<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        :value="itemInstance.user"
        :v="v.itemInstance.user"
        :label="$tc('objects.directory.users.users', 1)"
        :search-method="loadUsersOptions"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'user', value: $event })"
      ></wt-select>
      <wt-switcher
        :value="itemInstance.isSupervisor"
        :label="$t('objects.ccenter.agents.isSupervisor')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'isSupervisor', value: $event })"
      ></wt-switcher>
      <wt-select
        :value="itemInstance.team"
        :label="$tc('objects.ccenter.teams.teams', 1)"
        :search-method="loadTeamsOptions"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'team', value: $event })"
      ></wt-select>
      <wt-select
        v-show="!itemInstance.isSupervisor"
        :value="itemInstance.supervisor"
        :label="$tc('objects.ccenter.agents.supervisors', 1)"
        :search-method="loadSupervisorsOptions"
        :disabled="disableUserInput"
        :close-on-select="false"
        multiple
        @input="setItemProp({ prop: 'supervisor', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.auditor"
        :label="$tc('objects.ccenter.auditors.auditors', 1)"
        :search-method="loadAuditorsOptions"
        :disabled="disableUserInput"
        :close-on-select="false"
        multiple
        @input="setItemProp({ prop: 'auditor', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.region"
        :label="$tc('objects.lookups.regions.regions', 1)"
        :search-method="loadRegionsOptions"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'region', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.progressiveCount"
        :v="v.itemInstance.progressiveCount"
        :label="$t('objects.ccenter.agents.progressiveCount')"
        :disabled="disableUserInput"
        :min-value="0"
        type="number"
        required
        @input="setItemProp({ prop: 'progressiveCount', value: +$event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.chatCount"
        :v="v.itemInstance.chatCount"
        :label="$t('objects.ccenter.agents.chatCount')"
        :disabled="disableUserInput"
        :min-value="0"
        type="number"
        required
        @input="setItemProp({ prop: 'chatCount', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import AgentsAPI from '../api/agents';
import TeamsAPI from '../../teams/api/teams';
import UsersAPI from '../../../../directory/modules/users/api/users';
import RegionsAPI from '../../../../lookups/modules/regions/api/regions';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-agent-general',
  mixins: [openedTabComponentMixin],
  methods: {
    loadUsersOptions(params) {
      return AgentsAPI.getAgentUsersOptions(params);
    },
    loadTeamsOptions(params) {
      return TeamsAPI.getLookup(params);
    },
    loadSupervisorsOptions(params) {
      return AgentsAPI.getSupervisorOptions(params);
    },
    loadAuditorsOptions(params) {
      return UsersAPI.getLookup(params);
    },
    loadRegionsOptions(params) {
      return RegionsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
