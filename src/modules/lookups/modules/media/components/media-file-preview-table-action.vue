<template>
  <div class="table-action">
    <audio-preview
      v-if="isAudio"
      :playing="playing"
      @play="$emit('play')"
    ></audio-preview>
    <wt-icon-btn
      v-else
      :icon="typeIcon"
      @click="$emit('open')"
    ></wt-icon-btn>
  </div>
</template>

<script>
import AudioPreview from './media-audio-preview-table-action.vue';

export default {
  name: 'media-file-preview-table-action',
  components: { AudioPreview },
  props: {
    type: {
      type: String,
    },
    playing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isAudio() {
      return this.type.includes('audio');
    },
    typeIcon() {
      if (this.type.includes('image')) return 'preview-tag-image';
      if (this.type.includes('application')) return 'preview-tag-application';
      if (this.type.includes('video')) return 'preview-tag-video';
      return 'docs';
    },
  },
};
</script>

<style lang="scss" scoped>
.table-action {
  line-height: 0;
}
</style>
