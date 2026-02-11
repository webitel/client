<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ $t('objects.lookups.skills.changeAgentsSkill') }}
    </template>
    <template #main>
      <div class="skill-select-wrapper">
        <wt-select
          v-model="itemInstance.skill"
          :clearable="false"
          :label="$t('objects.lookups.skills.changeSkillTo')"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.skill"
          required
        />
      </div>
      <!-- temporary usage v-model:model-value instead of v-model because of vue 2 compat -->
      <wt-switcher
        v-model:model-value="skillState"
        :label="$t('objects.lookups.skills.state')"
        label-left
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="computeDisabled"
        @click="change"
      >
        {{ $t('objects.change') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import openedObjectValidationMixin from '../../../../../../../app/mixins/baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import SkillsAPI from '../../../api/agentSkills';

export default {
	name: 'OpenedSkillAgentChangePopup',
	mixins: [
		openedObjectValidationMixin,
	],
	props: {
		selectedAgents: {
			type: Array,
			required: true,
		},
	},
	emits: [
		'close',
		'change',
	],
	setup: () => ({
		// Reasons for use $stopPropagation
		// https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
		v$: useVuelidate({
			$stopPropagation: true,
		}),
	}),
	data: () => ({
		namespace: 'lookups/skills',
		subNamespace: 'agents',
		itemInstance: {
			skill: {},
		},
		skillState: false,
	}),
	validations: {
		itemInstance: {
			skill: {
				required,
			},
		},
	},
	computed: {
		computeDisabled() {
			return this.checkValidations();
		},
	},
	methods: {
		loadDropdownOptionsList(params) {
			return SkillsAPI.getLookup(params);
		},
		change() {
			const id = this.selectedAgents.map((item) => item.id);
			const changes = {
				enabled: this.skillState,
				skill: this.itemInstance.skill,
			};
			this.$emit('change', {
				changes,
				id,
			});
			this.close();
		},
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>
.skill-select-wrapper {
  margin-bottom: var(--spacing-sm);
}
</style>
