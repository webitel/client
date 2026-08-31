<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!resourceId"
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
          v-model:model-value="modelValue.resourceGroup"
          :label="t('objects.ccenter.resGroups.resGroups', 1)"
          :regle-validation="validationFields?.resourceGroup"
          :search-method="loadResGroupsOptions"
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
import { OutboundResourceGroupsAPI as ResourceGroupsAPI } from '@webitel/api-services/api';
import type { EngineQueueResourceGroup } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import QueuesRoutesName from '../../../router/_internals/QueuesRoutesName.enum';
import { useQueueResGroupsCardStore } from '../stores/card/queueResGroupsCardStore';

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasSaveActionAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const {
	modelValue,
	validationFields,
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineQueueResourceGroup>({
	useCardStore: useQueueResGroupsCardStore,
	routeParamName: 'resourceId',
	parentId: route.params.id as string,
});

const resourceId = computed(() => route.params.resourceId);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.ccenter.resGroups.resGroups', 1).toLowerCase()}`;
});

const { close } = useClose(QueuesRoutesName.RESOURCES);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};

const loadResGroupsOptions = (params: unknown) =>
	ResourceGroupsAPI.getLookup(params);
</script>

<style lang="scss" scoped></style>
