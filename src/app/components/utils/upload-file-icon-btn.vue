<template>
  <div :class="{ 'upload-file-icon-btn--disabled': disabled }" class="upload-file-icon-btn">
    <wt-icon-btn
      v-tooltip="$t('iconHints.upload')"
      icon="upload"
      :disabled="disabled"
      @click="triggerFileInput"
    />

    <input
      ref="file-input"
      :accept="accept"
      class="upload-file-icon-btn__input"
      :disabled="disabled"
      type="file"
      @change="inputFileHandler"
    >
  </div>
</template>

<script>
export default {
  name: 'UploadFileIconBtn',
  props: {
    accept: {
      type: String,
      default: '.csv',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  methods: {
    triggerFileInput() {
      this.$refs['file-input'].click();
    },
    inputFileHandler(event) {
      const { files } = event.target;
      this.$emit('change', files, event);
      this.clearFileInput();
    },
    clearFileInput() {
      this.$refs['file-input'].value = null;
    },
  },
};
</script>

<style scoped>
.upload-file-icon-btn {
  position: relative;
  line-height: 0;

  .upload-file-icon-btn__input {
    position: absolute;
    top: -2px;
    left: 0;
    visibility: hidden;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 0;
  }
}

.upload-file-icon-btn--disabled {
  pointer-events: none;
}
</style>
