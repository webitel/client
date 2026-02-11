<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import Agents from '../modules/agents/components/opened-team-agents.vue';
import Flows from '../modules/flow/components/opened-team-flows.vue';
import Hooks from '../modules/hooks/components/opened-team-hooks.vue';
import Supervisors from '../modules/supervisors/components/opened-team-supervisors.vue';
import TeamsRouteNames from '../router/_internals/TeamsRouteNames.enum.js';
import General from './opened-team-general.vue';
import Parameters from './opened-team-parameters.vue';

export default {
	name: 'OpenedTeam',
	components: {
		General,
		Supervisors,
		Agents,
		Parameters,
		Hooks,
		Flows,
	},
	mixins: [
		openedObjectMixin,
	],

	setup: () => {
		const v$ = useVuelidate();
		const { hasSaveActionAccess } = useUserAccessControl();

		const { hasReadAccess: hasAgentsReadAccess } = useUserAccessControl(
			WtObject.Agent,
		);
		const { hasReadAccess: hasSupervisorsReadAccess } = useUserAccessControl(
			WtObject.Agent,
		);
		const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
			WtObject.Flow,
		);

		return {
			v$,
			hasSaveActionAccess,
			hasAgentsReadAccess,
			hasSupervisorsReadAccess,
			hasFlowsReadAccess,
		};
	},

	data: () => ({
		namespace: 'ccenter/teams',
		routeName: RouteNames.TEAMS,
		permissionsTabPathName: TeamsRouteNames.PERMISSIONS,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
			},
			strategy: {
				required,
			},
			maxNoAnswer: {
				numeric,
				required,
			},
			wrapUpTime: {
				numeric,
				required,
			},
			noAnswerDelayTime: {
				numeric,
				required,
			},
			taskAcceptTimeout: {
				numeric,
				required,
			},
			callTimeout: {
				numeric,
				required,
			},
			inviteChatTimeout: {
				numeric,
				required,
			},
		},
	},
	computed: {
		tabs() {
			const general = {
				text: this.$t('objects.general'),
				value: 'general',
				pathName: TeamsRouteNames.GENERAL,
			};
			const parameters = {
				text: this.$t('objects.ccenter.teams.parameters'),
				value: 'parameters',
				pathName: TeamsRouteNames.PARAMETERS,
			};
			const supervisors = {
				text: this.$t('objects.ccenter.agents.supervisors', 2),
				value: 'supervisors',
				pathName: TeamsRouteNames.SUPERVISORS,
			};
			const agents = {
				text: this.$t('objects.ccenter.agents.agents', 2),
				value: 'agents',
				pathName: TeamsRouteNames.AGENTS,
			};
			const hooks = {
				text: this.$t('objects.ccenter.queues.hooks.hooks', 2),
				value: 'hooks',
				pathName: TeamsRouteNames.HOOKS,
			};
			const flows = {
				text: this.$t('objects.routing.flow.flow', 2),
				value: 'flows',
				pathName: TeamsRouteNames.FLOWS,
			};
			const tabs = [
				general,
				parameters,
				hooks,
			];

			if (this.hasAgentsReadAccess) tabs.push(agents);
			if (this.hasSupervisorsReadAccess) tabs.push(supervisors);
			if (this.hasFlowsReadAccess) tabs.push(flows);

			if (this.id) tabs.push(this.permissionsTab);
			return tabs;
		},

		path() {
			const baseUrl = '/contact-center/teams';
			return [
				{
					name: this.$t('objects.ccenter.ccenter'),
				},
				{
					name: this.$t('objects.team', 2),
					route: baseUrl,
				},
				{
					name: this.id ? this.pathName : this.$t('objects.new'),
					route: {
						name: this.currentTab.pathName,
						query: this.$route.query,
					},
				},
			];
		},
	},
};
</script>

<style
  lang="scss"
  scoped
></style>
