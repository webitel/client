<template>
  <section class="opened-flow-code">
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-multi-select
        v-model:model-value="modelValue.tags"
        :disabled="disableUserInput"
        :label="t('vocabulary.tag', 2)"
        :search-method="FlowsAPI.getFlowTags"
        option-label="name"
        chips-view
        allow-custom-values
        data-key="name"
      />
    </div>
    <code-editor
      v-model="modelValue.schema"
      :autocomplete="autocomplete"
      :disabled="disableUserInput"
      :label="t('objects.routing.flow.flow', 1)"
    />
  </section>
</template>

<script setup lang="ts">
import { FlowsAPI } from '@webitel/api-services/api';
import type { FlowCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import {
	type FlowApp,
	FlowTypeApplications,
} from '@webitel/ui-sdk/modules/Flow';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import {
	type FlowAppAutocompleteItem,
	flowAppAutocomplete,
} from '../../configs/flowAppAutocomplete';
import CodeEditor from './code-editor.vue';

const modelValue = defineModel<FlowCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<FlowCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const autocompleteByApp: Partial<Record<FlowApp, FlowAppAutocompleteItem>> =
	flowAppAutocomplete;

/** [Claude] only the apps of this flow's type; skip apps that have no autocomplete */
const autocomplete = computed<FlowAppAutocompleteItem[]>(() => {
	const apps: readonly FlowApp[] | undefined =
		FlowTypeApplications[
			modelValue.value.type as keyof typeof FlowTypeApplications
		];
	if (!apps) return Object.values(autocompleteByApp);
	return apps.flatMap((app) => autocompleteByApp[app] ?? []);
});
</script>

<style scoped>
/* [Claude] stretch to the form height, so the code editor fills the page */
.opened-flow-code {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
