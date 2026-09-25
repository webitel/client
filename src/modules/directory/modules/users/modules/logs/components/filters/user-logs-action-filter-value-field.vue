<template>
  <wt-single-select
    :label="t('objects.system.changelogs.logs.actions', 1)"
    :options="actionOptions"
    :model-value="model"
    clearable
    data-key="value"
    option-value="value"
    @update:model-value="model = $event"
  />
</template>

<script setup lang="ts">
import { LoggerAction } from '@webitel/api-services/gen/models';
import { WtSingleSelect } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

defineProps<{
	filterConfig?: unknown;
}>();

const model = defineModel<string>();

const { t } = useI18n();

const actionOptions = Object.values(LoggerAction)
	.filter(
		(action) =>
			action !== LoggerAction.DefaultNoAction && action !== LoggerAction.Read,
	)
	.map((action) => ({
		value: action,
		locale: `objects.system.changelogs.logs.actionType.${action}`,
	}));
</script>

<style scoped></style>
