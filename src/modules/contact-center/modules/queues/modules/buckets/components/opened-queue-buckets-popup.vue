<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!bucketId"
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
          v-model="queueBucket.bucket"
          :disabled="!hasBucketsReadAccess"
          :label="t('objects.lookups.buckets.buckets', 1)"
          :regle-validation="validationFields?.bucket"
          :search-method="loadBucketsOptions"
          required
        />
        <wt-input-number
          v-model="queueBucket.priority"
          :label="t('objects.ccenter.queues.bucketPriority')"
          :regle-validation="validationFields?.priority"
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
import { BucketsAPI } from '@webitel/api-services/api';
import type { EngineQueueBucket } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import QueuesRoutesName from '../../../router/_internals/QueuesRoutesName.enum';
import { useQueueBucketsCardStore } from '../stores';

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasSaveActionAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});
const { hasReadAccess: hasBucketsReadAccess } = useUserAccessControl(
	WtObject.Bucket,
);

const {
	modelValue,
	validationFields: rawValidationFields,
	isNew,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<EngineQueueBucket>({
	useCardStore: useQueueBucketsCardStore,
	routeParamName: 'bucketId',
	parentId: route.params.id as string,
});

/** cross-package ref, same as `modelValue` below — unwrapped for the template */
const validationFields = computed(() => rawValidationFields.value);

// read the draft through a local computed so the template can unwrap it
const queueBucket = computed(() => modelValue.value as EngineQueueBucket);

const bucketId = computed(() => route.params.bucketId);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.lookups.buckets.buckets', 1).toLowerCase()}`;
});

const { close } = useClose(QueuesRoutesName.BUCKETS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};

const loadBucketsOptions = (params: unknown) => BucketsAPI.getLookup(params);
</script>

<style lang="scss" scoped></style>
