<template>
  <wt-selection-popup
    :options="options"
    :selected="selected"
    :title="title"
    @add="create"
    @change="selected = $event"
    @close="emit('close')"
  />
</template>

<script setup lang="ts">
import { StorageProviderType } from '@webitel/api-services/gen/models';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

interface ProviderOption {
	value: StorageProviderType;
	title: string;
	icon: string;
}

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const router = useRouter();

const options: ProviderOption[] = [
	{
		value: StorageProviderType.Microsoft,
		title: StorageProviderType.Microsoft,
		icon: 'microsoft',
	},
	{
		value: StorageProviderType.Google,
		title: StorageProviderType.Google,
		icon: 'google',
	},
	{
		value: StorageProviderType.ElevenLabs,
		title: StorageProviderType.ElevenLabs,
		icon: 'elevenlabs',
	},
];

const selected = ref<ProviderOption>(options[0]);

const title = computed(
	() =>
		`${t('reusable.new')} ${t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 1).toLocaleLowerCase()}`,
);

const create = () =>
	router.push({
		name: `${RouteNames.COGNITIVE_PROFILES}-card`,
		params: {
			id: 'new',
		},
		query: {
			type: selected.value.value,
		},
	});
</script>
