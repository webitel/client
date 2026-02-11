<template>
  <wt-popup
    v-bind="attrs"
    class="apply-to-files-popup"
    size="sm"
    overflow
    @close="emit('close')"
  >
    <template #title>
      {{ t('objects.integrations.storagePolicies.applyToFiles') }}
    </template>

    <template #main>
      <span class="apply-to-files-popup__content">
        {{ t('objects.integrations.storagePolicies.applyPopupMessage') }}
      </span>
      <!--Slot for displaying specific template styling-->
      <slot name="after-section" />
    </template>

    <template #actions>
      <wt-button
        @click="apply"
      >
        {{ t('objects.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { defineEmits, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import StoragePoliciesAPI from '../api/storagePolicies.js';

const props = defineProps({
	id: {
		type: Number,
		String,
		required: true,
	},
});

const { t } = useI18n();
const emit = defineEmits([
	'close',
]);
const attrs = useAttrs();

const apply = async () => {
	await StoragePoliciesAPI.applyPolicies(props.id);
	emit('close');
};
</script>

<style scoped>
.apply-to-files-popup__content {
  display: flex;
  text-align: center;
}
</style>
