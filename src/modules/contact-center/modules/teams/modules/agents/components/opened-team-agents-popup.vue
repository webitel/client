<template>
  <wt-popup
    :shown="!!agentId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.teams.agents.addAgent') }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-single-select
          v-model:model-value="modelValue.agent"
          :label="t('objects.ccenter.agents.agents', 1)"
          :regle-validation="validationFields?.agent"
          :search-method="AgentsAPI.getLookup"
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

import TeamsRouteNames from '../../../router/_internals/TeamsRouteNames.enum';
import { useTeamAgentsCardStore } from '../stores/card/teamAgentsCardStore';

const props = defineProps<{
	parentId?: string | number | null;
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
	useCardStore: useTeamAgentsCardStore,
	routeParamName: 'agentId',
	parentId: () => props.parentId,
});

const agentId = computed(() => route.params.agentId);

const { close } = useClose(TeamsRouteNames.AGENTS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>
