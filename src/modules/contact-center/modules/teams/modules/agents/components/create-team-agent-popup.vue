<template>
  <wt-popup v-bind="$attrs" :shown="!!agentId" size="sm" overflow @close="close">
    <template #title>
      {{ $t('objects.ccenter.teams.agents.addAgent') }}
    </template>
    <template #main>
      <form>
        <wt-select :clearable="false" :label="$t('objects.ccenter.agents.agents', 1)" :search-method="loadAgentsOptions"
          :v="v$.itemInstance.agent" :value="itemInstance.agent" required
          @input="setItemProp({ prop: 'agent', value: $event })" />
      </form>
    </template>
    <template #actions>
      <wt-button :disabled="disabledSave" @click="save">
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import AgentsAPI from '../../../../agents/api/agents';

export default {
	name: 'OpenedTeamAgentPopup',
	mixins: [
		nestedObjectMixin,
	],

	setup: () => ({
		// Reasons for use $stopPropagation
		// https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
		v$: useVuelidate({
			$stopPropagation: true,
		}),
	}),

	data: () => ({
		namespace: 'ccenter/teams/agents',
	}),
	validations: {
		itemInstance: {
			agent: {
				required,
			},
		},
	},
	computed: {
		agentId() {
			return this.$route.params.agentId;
		},
	},

	watch: {
		agentId() {
			this.resetState();
		},
	},
	methods: {
		loadAgentsOptions(params) {
			return AgentsAPI.getLookup(params);
		},
	},
};
</script>

<style lang="scss" scoped></style>
