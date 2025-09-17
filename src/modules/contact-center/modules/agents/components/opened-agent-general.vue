<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>

<!--    <div>-->
<!--      <div class="opened-card-input-grid"></div>-->
<!--      <div class="opened-card-input-grid"></div>-->
<!--    </div>-->
    <div class="opened-card-input-grid">
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.team')"
        :search-method="loadTeamsOptions"
        :v="v.itemInstance.team"
        :value="itemInstance.team"
        required
        @input="setItemProp({ prop: 'team', value: $event })"
      />
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.isSupervisor')"
        :model-value="itemInstance.isSupervisor"
        @update:model-value="setItemProp({ prop: 'isSupervisor', value: $event })"
      />
      <wt-select
        :close-on-select="false"
        :disabled="disableUserInput"
        :label="$t('objects.auditor')"
        :search-method="loadAuditorsOptions"
        :value="itemInstance.auditor"
        multiple
        @input="setItemProp({ prop: 'auditor', value: $event })"
      />
      <wt-select
        v-show="!itemInstance.isSupervisor"
        :close-on-select="false"
        :disabled="disableUserInput"
        :label="$t('objects.supervisor')"
        :search-method="loadSupervisorsOptions"
        :value="itemInstance.supervisor"
        multiple
        @input="setItemProp({ prop: 'supervisor', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('objects.lookups.media.mediaFiles', 1)"
        :search-method="loadMediaOptions"
        :value="itemInstance.greetingMedia"
        @input="setItemProp({ prop: 'greetingMedia', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.region')"
        :search-method="loadRegionsOptions"
        :value="itemInstance.region"
        @input="setItemProp({ prop: 'region', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.progressiveCount')"
        :min-value="1"
        :v="v.itemInstance.progressiveCount"
        :value="itemInstance.progressiveCount"
        required
        type="number"
        @input="setItemProp({ prop: 'progressiveCount', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.chatCount')"
        :min-value="1"
        :v="v.itemInstance.chatCount"
        :value="itemInstance.chatCount"
        required
        type="number"
        @input="setItemProp({ prop: 'chatCount', value: +$event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.taskCount')"
        :min-value="1"
        :v="v.itemInstance.taskCount"
        :value="itemInstance.taskCount"
        required
        type="number"
        @input="setItemProp({ prop: 'taskCount', value: +$event })"
      />
      <div>
        <wt-switcher
          :disabled="disableUserInput || disabledAgentScreenControl"
          :label="$t('objects.ccenter.agents.agentScreenControl')"
          :model-value="itemInstance.screenControl"
          @update:model-value="setItemProp({ prop: 'screenControl', value: $event })"
        />

        <p v-if="disabledAgentScreenControl">{{ $t('objects.ccenter.agents.agentScreenControlHint') }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import UsersAPI from '../../../../directory/modules/users/api/users';
import MediaAPI from '../../../../lookups/modules/media/api/media';
import RegionsAPI from '../../../../lookups/modules/regions/api/regions';
import TeamsAPI from '../../teams/api/teams';
import AgentsAPI from '../api/agents';

export default {
  name: 'OpenedAgentGeneral',
  mixins: [openedTabComponentMixin],
  computed: {
    disabledAgentScreenControl() {
      return !this.itemInstance.allowSetScreenControl
    }
  },
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
    loadMediaOptions(params) {
      return MediaAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
