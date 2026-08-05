<template>
  <section class="opened-activity-type-general">
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-multi-select
        v-model:model-value="modelValue.skills"
        :label="t('objects.lookups.skills.skills', 2)"
        :search-method="loadSkillsOptions"
        class="opened-activity-type__skills"
        chips-view
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { RegleSchemaFieldStatus } from '@regle/schemas';
import type { EngineOnlineSkills } from '@webitel/api-services/gen/models';
import {
	WtInputText,
	WtMultiSelect,
	WtTextarea,
} from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';
import SkillsAPI from '../../agent-skills/api/agentSkills';

const modelValue = defineModel<EngineOnlineSkills>();

defineProps<{
	validationFields?: {
		[K in keyof EngineOnlineSkills]?: RegleSchemaFieldStatus<
			EngineOnlineSkills[K]
		>;
	};
}>();

const { t } = useI18n();

const loadSkillsOptions = (params) => {
	return SkillsAPI.getLookup(params);
};
</script>