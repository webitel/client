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
        :search="loadUsersOptions"
        :internal-search="false"
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
        :search="loadTeamsOptions"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'team', value: $event })"
      ></wt-select>
      <wt-select
        v-show="!itemInstance.isSupervisor"
        :value="itemInstance.supervisor"
        :label="$tc('objects.ccenter.agents.supervisors', 1)"
        :search="loadSupervisorsOptions"
        :internal-search="false"
        :disabled="disableUserInput"
        :close-on-select="false"
        multiple
        @input="setItemProp({ prop: 'supervisor', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.auditor"
        :label="$tc('objects.ccenter.auditors.auditors', 1)"
        :search="loadAuditorsOptions"
        :internal-search="false"
        :disabled="disableUserInput"
        :close-on-select="false"
        multiple
        @input="setItemProp({ prop: 'auditor', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.region"
        :label="$tc('objects.lookups.regions.regions', 1)"
        :search="loadRegionsOptions"
        :internal-search="false"
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
import { getAgentUsersOptions, getSupervisorOptions } from '../api/agents';
import { getTeamsList } from '../../teams/api/teams';
import { getUsersList } from '../../../../directory/modules/users/api/users';
import { getRegionsList } from '../../../../lookups/modules/regions/api/regions';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-agent-general',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadUsersOptions(search) {
      const response = await getAgentUsersOptions({ search, fields: ['name', 'id'] });
      return response.list;
    },
    async loadTeamsOptions(search) {
      const response = await getTeamsList({ search, fields: ['name', 'id'] });
      return response.list;
    },
    async loadSupervisorsOptions(search) {
      const response = await getSupervisorOptions({ search, fields: ['name', 'id'] });
      return response.list;
    },
    async loadAuditorsOptions(search) {
      const response = await getUsersList({ search, fields: ['name', 'id'] });
      return response.list;
    },
    async loadRegionsOptions(search) {
      const response = await getRegionsList({ search, fields: ['name', 'id'] });
      return response.list;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
