<template>
  <wt-popup
    :shown="!!supervisorId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-single-select
          v-model:model-value="modelValue.agent"
          :label="t('objects.ccenter.agents.agents', 1)"
          :regle-validation="validationFields?.agent"
          :search-method="loadSupervisorOptions"
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
import type { EngineLookup } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import TeamsRouteNames from '../../../router/_internals/TeamsRouteNames.enum';
import { TeamSupervisorsAPI } from '../api/teamSupervisors';
import { useTeamSupervisorsCardStore } from '../stores/card/teamSupervisorsCardStore';

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
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<{
	agent?: EngineLookup;
}>({
	useCardStore: useTeamSupervisorsCardStore,
	routeParamName: 'supervisorId',
	parentId: () => props.parentId,
});

const supervisorId = computed(() => route.params.supervisorId);

const popupTitle = computed(() =>
	isNew.value
		? t('objects.ccenter.teams.supervisors.addSupervisor')
		: t('objects.ccenter.teams.supervisors.editSupervisor'),
);

const loadSupervisorOptions = (params: object) =>
	TeamSupervisorsAPI.getTeamSupervisorOptions({
		...params,
		teamId: props.parentId,
	});

const { close } = useClose(TeamsRouteNames.SUPERVISORS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>
