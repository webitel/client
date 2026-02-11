<template>
  <div>
    <wt-button :loading="isFilesLoading" @click="exportFiles">
      {{ $t('utils.downloadFilesBtn.downloadFiles') }}
    </wt-button>
    <div v-show="isFilesLoading" class="files-counter typo-caption">
      <div>
        {{ $t('utils.downloadFilesBtn.filesLoaded') }}
        <span class="files-counter__count typo-caption">
          {{ filesDownloadProgress }}
        </span>
      </div>
      <div v-show="filesZippingProgress">
        {{ $t('utils.downloadFilesBtn.zippingProgress') }}
        <span class="files-counter__count typo-caption">{{ filesZippingProgress }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'DownloadFilesBtn',
	props: {
		isFilesLoading: {
			type: Boolean,
		},
		filesDownloadProgress: {
			type: Number,
		},
		filesZippingProgress: {
			type: Number,
		},
	},
	methods: {
		exportFiles() {
			this.$emit('export-files');
		},
	},
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.files-counter {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: var(--border-radius);
  background: var(--main-color);
  box-shadow: var(--box-shadow);
}
</style>
