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
      <form
        class="opened-blacklist-number-popup__form"
        @submit.prevent="save"
      >
        <wt-input-text
          v-model:model-value="modelValue.number"
          :label="t('objects.lookups.blacklist.number', 1)"
          :regle-validation="validationFields?.number"
          required
        />
        <wt-switcher
          :model-value="isTemporary"
          :label="t('objects.lookups.blacklist.temporary')"
          @update:model-value="toggleTemporary"
        />
        <wt-datepicker
          v-if="isTemporary"
          v-model:model-value="modelValue.expireAt"
          :label="t('objects.lookups.blacklist.expireAt')"
          show-time
        />
        <wt-textarea
          v-model:model-value="modelValue.description"
          :label="t('objects.description')"
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
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import BlacklistRouteNames from '../../../router/_internals/BlacklistRouteNames.enum';
import {
	type BlacklistNumberCard,
	useBlacklistNumbersCardStore,
} from '../stores/card/blacklistNumbersCardStore';

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
} = useNestedCardComponent<BlacklistNumberCard>({
	useCardStore: useBlacklistNumbersCardStore,
	routeParamName: 'numberId',
	parentId: () => props.parentId,
});

const numberId = computed(() => route.params.numberId);

/* [Claude] switcher is UI-only: a number is temporary when it has an expiration date, 0 means permanent */
const isTemporary = ref(false);

watch(
	() => modelValue.value?.expireAt,
	(expireAt) => {
		if (Number(expireAt)) isTemporary.value = true;
	},
	{
		immediate: true,
	},
);

watch(numberId, (id) => {
	if (!id) isTemporary.value = false;
});

const toggleTemporary = (value: boolean) => {
	isTemporary.value = value;
	modelValue.value.expireAt = value ? Date.now() : 0;
};

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.add') : t('reusable.edit');
	return `${action} ${t('objects.ccenter.res.numbers', 1).toLowerCase()}`;
});

const { close } = useClose(BlacklistRouteNames.NUMBERS);

const save = async () => {
	await saveItem();
	close();
	emit('saved');
};
</script>

<style scoped>
.opened-blacklist-number-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
