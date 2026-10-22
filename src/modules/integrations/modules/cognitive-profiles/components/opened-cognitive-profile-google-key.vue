<template>
  <div class="opened-cognitive-profile-google-key">
    <wt-label :invalid="invalid">
      {{ t('objects.key') }}*
    </wt-label>
    <div v-if="!properties.keyFilename">
      <wt-button
        :disabled="disabled"
        :loading="isKeyLoading"
        :color="ButtonColor.SECONDARY"
        wide
        @click="fileInput?.click()"
      >
        {{ t('reusable.upload') }}
      </wt-button>
      <input
        ref="fileInput"
        accept="application/json"
        class="opened-cognitive-profile-google-key__input"
        type="file"
        @input="handleFileInput"
      >
    </div>
    <div
      v-else
      class="opened-cognitive-profile-google-key__file"
    >
      {{ properties.keyFilename }}
      <wt-icon-action
        :disabled="disabled"
        action="delete"
        @click="deleteFile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventBus } from '@webitel/ui-sdk/composables';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

/** [Claude] the profile's `properties`: a google key is the parsed json of its key file */
const properties = defineModel<Record<string, unknown>>({
	required: true,
});

defineProps<{
	disabled?: boolean;
	invalid?: boolean;
}>();

const { t } = useI18n();
const eventBus = useEventBus();

const fileInput = useTemplateRef<HTMLInputElement>('fileInput');
const isKeyLoading = ref(false);

const handleFileInput = async (event: Event) => {
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	if (!file) return;

	isKeyLoading.value = true;
	try {
		properties.value.key = JSON.parse(await file.text());
		properties.value.keyFilename = file.name;
	} catch {
		eventBus.$emit('notification', {
			type: 'error',
			text: t('errors.invalidJson'),
		});
	} finally {
		isKeyLoading.value = false;
		input.value = '';
	}
};

const deleteFile = () => {
	properties.value.key = '';
	properties.value.keyFilename = '';
};
</script>

<style scoped>
.opened-cognitive-profile-google-key__input {
  width: 0;
  height: 0;
}

.opened-cognitive-profile-google-key__file {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  background: var(--secondary-color);
}
</style>
