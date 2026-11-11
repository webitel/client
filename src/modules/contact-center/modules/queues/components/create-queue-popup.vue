<template>
  <wt-selection-popup
    :options="options"
    :selected="selected"
    :title="t('objects.ccenter.queues.newQueue')"
    @change="selected = $event"
    @close="emit('close')"
    @add="createQueue"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

interface QueueTypeOption {
	/** the popup identifies the selected option by `value` */
	value: string;
	subpath: string;
	title: string;
	description: string;
}

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const router = useRouter();

const options = computed<QueueTypeOption[]>(() =>
	Object.entries(QueueTypeProperties).map(([type, { locale, subpath }]) => ({
		value: type,
		subpath,
		title: t(locale),
		description: t(`${locale}Description`),
	})),
);

const selected = ref<QueueTypeOption | undefined>(options.value[0]);

/**
 * The card reads the chosen type off `?type=` — it decides which fields the new
 * queue is seeded with and which tabs it shows.
 */
const createQueue = () =>
	router.push({
		name: `${RouteNames.QUEUES}-card`,
		params: {
			id: 'new',
		},
		query: {
			type: selected.value?.value,
		},
	});
</script>
