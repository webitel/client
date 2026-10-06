<template>
  <wt-popup
    :shown="!!numberId"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-input-text
          v-model:model-value="modelValue.display"
          :label="t('objects.ccenter.res.numbers', 1)"
          :regle-validation="validationFields?.display"
          required
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
import type { EngineResourceDisplay } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import ResourcesRouteNames from '../../../router/_internals/ResourcesRouteNames.enum';
import { useResourceNumbersCardStore } from '../stores/card/resourceNumbersCardStore';

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
} = useNestedCardComponent<EngineResourceDisplay>({
	useCardStore: useResourceNumbersCardStore,
	routeParamName: 'numberId',
	parentId: () => props.parentId,
});

const numberId = computed(() => route.params.numberId);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.ccenter.res.numbers', 1).toLowerCase()}`;
});

const { close } = useClose(ResourcesRouteNames.NUMBERS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>
