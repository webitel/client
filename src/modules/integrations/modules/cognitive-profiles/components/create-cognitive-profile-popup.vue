<template>
  <selection-popup
    :options="options"
    :selected="selected"
    :title="`
    ${$t('reusable.new')}
    ${$t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 1).toLocaleLowerCase()}
    `"
    @change="selectOption"
    @close="close"
    @select="create"
  />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StorageProviderType } from 'webitel-sdk';

import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const emit = defineEmits([
	'close',
]);

const router = useRouter();
const route = useRoute();

const selected = ref({});

const options = computed(() => {
	const microsoft = {
		value: StorageProviderType.Microsoft,
		title: StorageProviderType.Microsoft,
		icon: 'microsoft',
	};
	const google = {
		value: StorageProviderType.Google,
		title: StorageProviderType.Google,
		icon: 'google',
	};
	const elevenLabs = {
		value: StorageProviderType.ElevenLabs,
		title: StorageProviderType.ElevenLabs,
		icon: 'elevenlabs',
	};
	return [
		microsoft,
		google,
		elevenLabs,
	];
});

function selectOption(option) {
	selected.value = option;
}

selectOption(options.value[0]);

function create() {
	router.push({
		name: `${RouteNames.COGNITIVE_PROFILES}-card`,
		query: {
			type: selected.value.value,
		},
		params: {
			id: 'new',
		},
	});
}

function close() {
	emit('close');
}
</script>

<style lang="scss" scoped>

</style>
