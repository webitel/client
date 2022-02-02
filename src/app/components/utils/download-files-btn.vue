<template>
  <div>
    <wt-button
      :loading="isFilesLoading"
      @click="exportFiles"
    >{{ $t('utils.downloadFilesBtn.downloadFiles') }}
    </wt-button>
    <div v-show="isFilesLoading" class="files-counter">
      <div>
        {{ $t('utils.downloadFilesBtn.filesLoaded') }}
        <span class="files-counter__count">
            {{ filesDownloadProgress }}
          </span>
      </div>
      <div v-show="filesZippingProgress">
        {{ $t('utils.downloadFilesBtn.zippingProgress') }}
        <span class="files-counter__count">{{ filesZippingProgress }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'download-files-btn',
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
.files-counter {
  @extend %typo-caption;
  position: absolute;
  right: 0;
  top: 100%;
  padding: 10px 15px;
  margin-top: 10px;
  background: var(--main-primary-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);

  &__count {
    @extend %typo-caption;
  }
}
</style>
