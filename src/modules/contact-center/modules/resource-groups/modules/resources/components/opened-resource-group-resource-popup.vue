<template>
  <wt-popup
    :shown="!!resourceId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form
        class="opened-resource-group-resource-popup__form"
        @submit.prevent="save"
      >
        <wt-single-select
          v-model:model-value="modelValue.resource"
          :label="t('objects.ccenter.res.res', 1)"
          :regle-validation="validationFields?.resource"
          :search-method="OutboundResourcesAPI.getLookup"
          :show-clear="false"
          required
        />
        <wt-input-number
          v-model:model-value="modelValue.priority"
          :label="t('objects.ccenter.res.priority')"
          :regle-validation="validationFields?.priority"
        />
        <wt-single-select
          v-model:model-value="modelValue.reserveResource"
          :label="t('objects.ccenter.res.reserveResource', 1)"
          :regle-validation="validationFields?.reserveResource"
          :search-method="OutboundResourcesAPI.getLookup"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="hasValidationErrors"
        @click="save"
      >
        {{ isNew ? t('objects.add') : t('objects.save') }}
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
import { OutboundResourcesAPI } from '@webitel/api-services/api';
import type { EngineOutboundResourceInGroup } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import ResourcesGroupsRouteNames from '../../../router/_internals/ResourcesGroupsRouteNames.enum';
import { useResourceGroupResourcesCardStore } from '../stores/card/resourceGroupResourcesCardStore';

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
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineOutboundResourceInGroup>({
	useCardStore: useResourceGroupResourcesCardStore,
	routeParamName: 'resourceId',
	parentId: () => props.parentId,
});

const resourceId = computed(() => route.params.resourceId);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.ccenter.res.res', 1).toLowerCase()}`;
});

const { close } = useClose(ResourcesGroupsRouteNames.RESOURCES);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>

<style scoped>
.opened-resource-group-resource-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
