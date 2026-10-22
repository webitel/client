<template>
  <div class="download-media-files-action">
    <wt-button
      :loading="loading"
      @click="emit('click')"
    >
      {{ t('utils.downloadFilesBtn.downloadFiles') }}
    </wt-button>
    <div
      v-show="loading"
      class="download-media-files-action__progress typo-caption"
    >
      <p>{{ t('utils.downloadFilesBtn.filesLoaded') }} {{ downloadedCount }}</p>
      <p v-show="zippingPercent">
        {{ t('utils.downloadFilesBtn.zippingProgress') }} {{ zippingPercent }}%
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
	loading?: boolean;
	downloadedCount?: number;
	zippingPercent?: number;
}>();

const emit = defineEmits<{
	click: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.download-media-files-action {
  position: relative;
}

.download-media-files-action__progress {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  background: var(--content-wrapper-color);
  box-shadow: var(--elevation-10);
  white-space: nowrap;
}
</style>
