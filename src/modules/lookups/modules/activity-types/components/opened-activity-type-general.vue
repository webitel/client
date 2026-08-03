<template>
  <section class="opened-activity-type-general">
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :label="$t('objects.name')"
        v-model:model-value="modelValue.item.name"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-multi-select
        :label="$t('objects.lookups.skills.skills', 2)"
        :search-method="loadSkillsOptions"
        :model-value="modelValue.item.skills"
        class="opened-activity-type__skills"
        chips-view
        :options="skillsOptions"
        @update:model-value="setItemProp({ prop: 'auditor', value: $event })"
      />
      <wt-textarea
        :label="$t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { RegleSchemaFieldStatus } from '@regle/schemas';
import type { EngineSkillPreset } from '@webitel/api-services/gen/models';
import SkillsAPI from '../../agent-skills/api/agentSkills';

const modelValue = defineModel<EngineSkillPreset>();

defineProps<{
	validationFields?: {
		[K in keyof EngineSkillPreset]?: RegleSchemaFieldStatus<
			EngineSkillPreset[K]
		>;
	};
}>();

const loadSkillsOptions = (params) => {
	return SkillsAPI.getLookup(params);
};

const setItemProp = (item) => {};

const skillsOptions = [];
</script>