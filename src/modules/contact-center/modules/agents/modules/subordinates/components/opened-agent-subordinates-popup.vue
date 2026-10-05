<template>
  <wt-popup
    :shown="!!subordinateId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.agents.addSubordinate') }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-single-select
          v-model:model-value="modelValue.agent"
          :label="t('objects.ccenter.agents.subordinates', 1)"
          :regle-validation="validationFields?.agent"
          :search-method="AgentsAPI.getRegularAgentsOptions"
          :show-clear="false"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="hasValidationErrors"
        @click="save"
      >
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import { AgentsAPI } from '@webitel/api-services/api';
import type { EngineLookup } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import AgentsRouteNames from '../../../router/_internals/AgentsRouteNames.enum';
import { useAgentSubordinatesCardStore } from '../stores/card/agentSubordinatesCardStore';

const props = defineProps<{
	parentId: string | number | null;
}>();

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const {
	modelValue,
	validationFields,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<{
	agent?: EngineLookup;
}>({
	useCardStore: useAgentSubordinatesCardStore,
	routeParamName: 'subordinateId',
	parentId: () => props.parentId,
});

const subordinateId = computed(() => route.params.subordinateId);

const { close } = useClose(AgentsRouteNames.SUBORDINATES);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>
