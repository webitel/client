<template>
  <wt-popup
    :shown="!!hookId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.queues.hooks.hooks', 1) }}
    </template>
    <template #main>
      <form
        class="opened-team-hooks-popup__form"
        @submit.prevent="save"
      >
        <wt-single-select
          v-model:model-value="modelValue.event"
          :label="t('objects.ccenter.queues.hooks.event')"
          :options="eventOptions"
          :regle-validation="validationFields?.event"
          :show-clear="false"
          data-key="value"
          option-value="value"
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
	type EngineTeamHook,
	EngineTeamHookEvent,
} from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor, WtObject } from '@webitel/ui-sdk/enums';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import TeamsRouteNames from '../../../router/_internals/TeamsRouteNames.enum';
import { useTeamHooksCardStore } from '../stores/card/teamHooksCardStore';

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
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineTeamHook>({
	useCardStore: useTeamHooksCardStore,
	routeParamName: 'hookId',
	parentId: () => props.parentId,
});

const hookId = computed(() => route.params.hookId);

const eventOptions = computed(() =>
	[
		EngineTeamHookEvent.AgentStatus,
	].map((event) => ({
		name: t(`objects.ccenter.teams.hooks.eventTypes.${snakeToCamel(event)}`),
		value: event,
	})),
);

const { close } = useClose(TeamsRouteNames.HOOKS);

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
.opened-team-hooks-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
