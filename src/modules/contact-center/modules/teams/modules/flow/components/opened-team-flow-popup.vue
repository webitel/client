<template>
  <wt-popup
    :shown="!!flowId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form
        class="opened-team-flow-popup__form"
        @submit.prevent="save"
      >
        <wt-input-text
          v-model:model-value="modelValue.name"
          :label="t('objects.title')"
          :regle-validation="validationFields?.name"
          required
        />
        <wt-single-select
          v-model:model-value="modelValue.schema"
          :disabled="!hasFlowsReadAccess"
          :label="t('objects.routing.flow.flow', 1)"
          :regle-validation="validationFields?.schema"
          :search-method="hasFlowsReadAccess && loadFlowOptions"
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
        {{ t('objects.save') }}
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
import { FlowsAPI } from '@webitel/api-services/api';
import {
	EngineRoutingSchemaType,
	type EngineTeamTrigger,
} from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor, WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import TeamsRouteNames from '../../../router/_internals/TeamsRouteNames.enum';
import { useTeamFlowsCardStore } from '../stores/card/teamFlowsCardStore';

const props = defineProps<{
	parentId?: string | number | null;
}>();

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

const {
	modelValue,
	validationFields,
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineTeamTrigger>({
	useCardStore: useTeamFlowsCardStore,
	routeParamName: 'flowId',
	parentId: () => props.parentId,
});

const flowId = computed(() => route.params.flowId);

const popupTitle = computed(() =>
	isNew.value
		? t('objects.ccenter.teams.flows.addFlowSchema')
		: t('objects.ccenter.teams.flows.editFlowSchema'),
);

const { close } = useClose(TeamsRouteNames.FLOWS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};

const loadFlowOptions = (params: object) =>
	FlowsAPI.getLookup({
		...params,
		type: [
			EngineRoutingSchemaType.Service,
		],
	});
</script>

<style scoped>
.opened-team-flow-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
