<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>

    <div class="object-input-area-grid">
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput || !hasUserReadAccess"
        :label="$t('objects.user')"
        :search-method="loadUsersOptions"
        :v="v.itemInstance.user"
        :model-value="itemInstance.user"
        required
        class="object-input-area-grid__user"
        @update:model-value="setItemProp({ prop: 'user', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasTeamReadAccess"
        :label="$t('objects.team')"
        :search-method="loadTeamsOptions"
        :v="v.itemInstance.team"
        :model-value="itemInstance.team"
        required
        class="object-input-area-grid__team"
        @update:model-value="setItemProp({ prop: 'team', value: $event })"
      />
      <wt-multi-select
        :disabled="disableUserInput || !hasAuditorReadAccess"
        :label="$t('objects.auditor')"
        :search-method="loadAuditorsOptions"
        :model-value="itemInstance.auditor"
        class="object-input-area-grid__auditor"
        @update:model-value="setItemProp({ prop: 'auditor', value: $event })"
      />
      <wt-multi-select
        :disabled="disableUserInput || itemInstance.isSupervisor || !hasSupervisorReadAccess"
        :label="$t('objects.supervisor')"
        :search-method="loadSupervisorsOptions"
        :model-value="itemInstance.supervisor"
        class="object-input-area-grid__supervisor"
        @update:model-value="setItemProp({ prop: 'supervisor', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasMediaReadAccess"
        :label="$t('objects.lookups.media.mediaFiles', 1)"
        :search-method="loadMediaOptions"
        :model-value="itemInstance.greetingMedia"
        class="object-input-area-grid__media"
        @update:model-value="setItemProp({ prop: 'greetingMedia', value: $event })"
      />
      <wt-single-select
        :disabled="disableUserInput || !hasRegionReadAccess"
        :label="$t('objects.region')"
        :search-method="loadRegionsOptions"
        :model-value="itemInstance.region"
        class="object-input-area-grid__region"
        @update:model-value="setItemProp({ prop: 'region', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.queue.progressiveCount')"
        :v="v.itemInstance.progressiveCount"
        :custom-validators="progressiveCountValidator"
        :model-value="itemInstance.progressiveCount"
        class="object-input-area-grid__progressive-count"
        @update:model-value="setItemProp({ prop: 'progressiveCount', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.chatCount')"
        :v="v.itemInstance.chatCount"
        :model-value="itemInstance.chatCount"
        required
        class="object-input-area-grid__chat-count"
        @update:model-value="setItemProp({ prop: 'chatCount', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.taskCount')"
        :v="v.itemInstance.taskCount"
        :model-value="itemInstance.taskCount"
        required
        class="object-input-area-grid__task-count"
        @update:model-value="setItemProp({ prop: 'taskCount', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.extraChatCount')"
        :v="v.itemInstance.extraChatCount"
        :model-value="itemInstance.extraChatCount"
        class="object-input-area-grid__extra-chat-count"
        @update:model-value="setItemProp({ prop: 'extraChatCount', value: $event })"
      />
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.agents.isSupervisor')"
        :model-value="itemInstance.isSupervisor"
        class="object-input-area-grid__is-supervisor"
        @update:model-value="setItemProp({ prop: 'isSupervisor', value: $event })"
      />
      <div class="object-input-area-grid__screen-control">
        <wt-switcher
          :disabled="disableUserInput || disabledAgentScreenControl && !isNew"
          :label="$t('objects.ccenter.agents.agentScreenControl')"
          :model-value="itemInstance.screenControl"
          @update:model-value="setItemProp({ prop: 'screenControl', value: $event })"
        />

        <span
          v-if="disabledAgentScreenControl && !isNew"
          class="object-input-area-grid__screen-control-hint typo-body-2"
        >
          {{ $t('objects.ccenter.agents.agentScreenControlHint') }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import UsersAPI from '../../../../directory/modules/users/api/users';
import MediaAPI from '../../../../lookups/modules/media/api/media';
import RegionsAPI from '../../../../lookups/modules/regions/api/regions';
import TeamsAPI from '../../teams/api/teams';
import AgentsAPI from '../api/agents';

export default {
	name: 'OpenedAgentGeneral',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		const { hasReadAccess: hasUserReadAccess } = useUserAccessControl(
			WtObject.User,
		);
		const { hasReadAccess: hasTeamReadAccess } = useUserAccessControl(
			WtObject.Team,
		);
		const { hasReadAccess: hasAuditorReadAccess } = useUserAccessControl(
			WtObject.User,
		);
		const { hasReadAccess: hasSupervisorReadAccess } = useUserAccessControl(
			WtObject.User,
		);
		const { hasReadAccess: hasMediaReadAccess } = useUserAccessControl(
			WtObject.Media,
		);
		const { hasReadAccess: hasRegionReadAccess } = useUserAccessControl(
			WtObject.Region,
		);

		return {
			disableUserInput,
			hasUserReadAccess,
			hasTeamReadAccess,
			hasAuditorReadAccess,
			hasSupervisorReadAccess,
			hasMediaReadAccess,
			hasRegionReadAccess,
		};
	},
	computed: {
		progressiveCountValidator() {
			return [
				{
					name: 'minValue',
					text: this.$t('objects.ccenter.agents.progressiveCountValidator'),
				},
			];
		},
		disabledAgentScreenControl() {
			return !this.itemInstance.allowSetScreenControl;
		},
		isNew() {
			return this.$route.fullPath.includes('new');
		},
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

<style scoped>
.object-input-area-grid {
  display: grid;
  grid-template-areas:
    'user media'
    'team progressiveCount'
    'region chatCount'
    'auditor extraChatCount'
    'supervisor taskCount'
    'screenControl isSupervisor'
  ;
  grid-template-columns: 1fr 1fr;

}

.object-input-area-grid__user {
  grid-area: user;
}

.object-input-area-grid__team {
  grid-area: team;
}

.object-input-area-grid__is-supervisor {
  grid-area: isSupervisor;
  align-self: center;
}

.object-input-area-grid__auditor {
  grid-area: auditor;
}

.object-input-area-grid__supervisor {
  grid-area: supervisor;
}

.object-input-area-grid__media {
  grid-area: media;
}

.object-input-area-grid__region {
  grid-area: region;
}

.object-input-area-grid__progressive-count {
  grid-area: progressiveCount;
}

.object-input-area-grid__chat-count {
  grid-area: chatCount;
}

.object-input-area-grid__task-count {
  grid-area: taskCount;
}

.object-input-area-grid__screen-control {
  grid-area: screenControl;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2xs);

}
</style>
