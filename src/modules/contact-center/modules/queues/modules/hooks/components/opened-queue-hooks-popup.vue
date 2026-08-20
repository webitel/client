<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!hookId"
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
        :disabled="!hasSaveActionAccess || hasValidationErrors"
        @click="save"
      >
        {{ t('objects.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import type { EngineQueueHook } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import FlowsAPI from '../../../../../../routing/modules/flow/api/flow';
import QueuesRoutesName from '../../../router/_internals/QueuesRoutesName.enum';
import { HookQueueEvent } from '../enums/HookQueueEvent.enum';
import { useQueueHooksCardStore } from '../stores';

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasSaveActionAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

const {
	modelValue,
	validationFields,
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineQueueHook>({
	useCardStore: useQueueHooksCardStore,
	routeParamName: 'hookId',
	parentId: route.params.id as string,
});

const hookId = computed(() => route.params.hookId);

const eventOptions = computed(() =>
	Object.values(HookQueueEvent).map((event) => ({
		name: t(`objects.ccenter.queues.hooks.eventTypes.${event}`),
		value: event,
	})),
);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.ccenter.queues.hooks.hooks', 1).toLowerCase()}`;
});

const { close } = useClose(QueuesRoutesName.HOOKS);

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

<style lang="scss" scoped></style>
