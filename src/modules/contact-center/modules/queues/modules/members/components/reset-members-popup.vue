<template>
  <wt-popup
    class="reset-members-popup"
    size="sm"
    min-width="480"
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.members.resetMembers.resetMembers') }}
    </template>
    <template #main>
      <div class="reset-members-popup--description">
        <p
          v-if="quantity"
          class="reset-members-popup--description-main"
        >
          {{ descriptionMainText }}
        </p>
        <p class="reset-members-popup--description-count">
          {{ descriptionCountText }}
        </p>
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="isResetting"
        color="secondary"
        @click="cancel"
      >
        {{ t(!!quantity ? 'reusable.cancel' : 'objects.ok') }}
      </wt-button>
      <wt-button
        v-if="!!quantity"
        :loading="isResetting"
        color="error"
        @click="confirm"
      >
        {{ t('objects.ccenter.members.resetMembers.reset') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { useEventBus } from '@webitel/ui-sdk/composables';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ActionOptions } from '../types/ActionOptions';

const props = withDefaults(
	defineProps<{
		callback: () => unknown;
		dateRange?: {
			from?: string;
			to?: string;
		};
		quantity?: number;
		scope?: ActionOptions;
	}>(),
	{
		scope: ActionOptions.All,
	},
);

const emit = defineEmits<{
	close: [];
	cancel: [];
}>();

const { t } = useI18n();
const $eventBus = useEventBus();

const isResetting = ref(false);

const descriptionMainText = computed(() =>
	t(`objects.ccenter.members.resetMembers.description.${props.scope}`, {
		dateFrom: props.dateRange?.from,
		dateTo: props.dateRange?.to,
	}),
);

const descriptionCountText = computed(() =>
	t(
		`objects.ccenter.members.resetMembers.${props.quantity ? 'descriptionCount' : 'emptyDescription'}`,
		{
			count: props.quantity,
		},
	),
);

const close = () => emit('close');

const confirm = async () => {
	try {
		isResetting.value = true;
		const response = (await props.callback()) as {
			count?: number;
		} | null;
		const count = response?.count ?? 0;
		$eventBus?.$emit('notification', {
			type: 'success',
			text: t('objects.ccenter.members.resetMembers.successResetCount', {
				count,
			}),
		});
	} finally {
		isResetting.value = false;
		close();
	}
};

const cancel = () => {
	emit('cancel');
	close();
};
</script>

<style scoped>
.reset-members-popup--description {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
  white-space: pre-line;
  text-align: center;
}
</style>
