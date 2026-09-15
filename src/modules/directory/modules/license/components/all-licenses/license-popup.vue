<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.license.importLicense') }}
    </template>
    <template #main>
      <form @submit.prevent="save">
        <wt-input-text
          v-model:model-value="certificate"
          :label="t('objects.directory.license.licenseKey')"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="invalid"
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { LicenseAPI } from '../../api/license';
import { useLicenseDatalistStore } from '../../stores';

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const { loadDataList } = useLicenseDatalistStore();

const certificate = ref('');

const invalid = computed(() => !certificate.value.trim());

const close = () => emit('close');

const save = async () => {
	if (invalid.value) return;

	await LicenseAPI.update({
		certificate: certificate.value,
	});
	await loadDataList();
	close();
};
</script>
