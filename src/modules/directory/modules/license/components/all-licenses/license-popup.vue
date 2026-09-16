<template>
  <wt-popup
    :shown="shown"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.license.importLicense') }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-input-text
          v-model:model-value="draft.certificate"
          :label="t('objects.directory.license.licenseKey')"
          :regle-validation="r$.$fields.certificate"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="r$.$invalid"
        @click="save"
      >
        {{ t('objects.add') }}
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

<script setup lang="ts">
import { useRegleSchema } from '@regle/schemas';
import { LicenseAPI } from '@webitel/api-services/api';
import { licenseImportSchema } from '@webitel/api-services/validations';
import { nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useLicenseDatalistStore } from '../../stores';

const props = defineProps<{
	shown?: boolean;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const { loadDataList } = useLicenseDatalistStore();

const draft = ref({
	certificate: '',
});

const { r$ } = useRegleSchema(draft, licenseImportSchema, {
	autoDirty: true,
	syncState: {
		onValidate: true,
	},
});

const close = () => emit('close');

const save = async () => {
	const { valid } = await r$.$validate();
	if (!valid) return;

	await LicenseAPI.update({
		certificate: draft.value.certificate,
	});
	await loadDataList();
	close();
};

watch(
	() => props.shown,
	async (shown) => {
		if (!shown) return;

		draft.value = {
			certificate: '',
		};
		await nextTick();
		r$.$fields.certificate.$touch();
	},
	{
		immediate: true,
	},
);
</script>
