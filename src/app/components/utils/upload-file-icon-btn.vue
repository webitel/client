<template>
  <div class="upload-file-icon-btn">
    <wt-icon-btn
      icon="upload"
      :tooltip="$t('iconHints.upload')"
      @click="triggerFileInput"
    ></wt-icon-btn>
    <input
      ref="file-input"
      class="upload-file-icon-btn__input"
      type="file"
      :accept="accept"
      @change="inputFileHandler"
    >
  </div>
</template>

<script>
export default {
  name: 'upload-file-icon-btn',
  props: {
    accept: {
      type: String,
    },
  },
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

<style lang="scss">
.upload-file-icon-btn {
  position: relative;
  line-height: 0;

  .upload-file-icon-btn__input {
    position: absolute;
    top: -2px;
    left: 0;
    width: 24px;
    height: 24px;
    font-size: 0;
    visibility: hidden;
    cursor: pointer;
  }
}
</style>
