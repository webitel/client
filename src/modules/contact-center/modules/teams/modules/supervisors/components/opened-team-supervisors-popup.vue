<template>
  <wt-popup v-bind="$attrs" :shown="!!supervisorId" size="sm" overflow @close="close">
    <template #title>
      {{ popupTitle }}
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
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';

import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import AgentsAPI from '../../../../agents/api/agents';

export default {
	name: 'OpenedTeamAgentsPopup',
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
		namespace: 'ccenter/teams/supervisors',
	}),
	validations: {
		itemInstance: {
			agent: {
				required,
			},
		},
	},

	computed: {
		...mapState({
			parentId(state) {
				return getNamespacedState(state, this.namespace).parentId;
			},
		}),
		popupTitle() {
			return this.id
				? this.$t('objects.ccenter.teams.supervisors.editSupervisor')
				: this.$t('objects.ccenter.teams.supervisors.addSupervisor');
		},
		supervisorId() {
			return this.$route.params.supervisorId;
		},
	},
	watch: {
		supervisorId: {
			handler(id) {
				if (id === 'new') {
					this.resetState();
				} else if (id) {
					this.setId(id);
					this.loadItem();
				}
			},
			immediate: true,
		},
	},

	methods: {
		async loadAgentsOptions(params) {
			const fields = [
				'id',
				'user',
			];
			const response = await AgentsAPI.getSupervisorOptions({
				...params,
				fields,
				notTeamId: this.parentId,
			});
			response.items = response.items.map(({ user, id }) => ({
				name: user.name,
				id,
			}));
			return response;
		},
	},
};
</script>

<style lang="scss" scoped></style>
