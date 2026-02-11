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
import { required } from '@vuelidate/validators';
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import Agents from '../modules/agents/components/opened-skill-agents.vue';
import AgentSkillsRoutesName from '../router/_internals/AgentSkillsRouteNames.enum.js';
import General from './opened-agent-skill-general.vue';

export default {
	name: 'OpenedAgentSkill',
	components: {
		General,
		Agents,
	},
	mixins: [
		openedObjectMixin,
	],

	setup: () => {
		const v$ = useVuelidate();
		const { hasSaveActionAccess } = useUserAccessControl();
		const { hasReadAccess: hasReadAgentAccess } = useUserAccessControl(
			WtObject.Agent,
		);
		return {
			v$,
			hasSaveActionAccess,
			hasReadAgentAccess,
		};
	},
	data: () => ({
		namespace: 'lookups/skills',
		routeName: RouteNames.SKILLS,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
			},
		},
	},

	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: AgentSkillsRoutesName.GENERAL,
				},
			];
			const agents = {
				text: this.$t('objects.ccenter.agents.agents', 2),
				value: 'agents',
				pathName: AgentSkillsRoutesName.AGENTS,
			};
			if (this.id && this.hasReadAgentAccess) tabs.push(agents);
			return tabs;
		},

		path() {
			const baseUrl = '/lookups/skills';
			return [
				{
					name: this.$t('objects.lookups.lookups'),
				},
				{
					name: this.$t('objects.lookups.skills.agentSkills', 2),
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
	methods: {
		close() {
			this.$router.push({
				name: this.routeName,
			});
		},
	},
};
</script>

<style scoped></style>
