<template>
  <div class="iframe-wrap">
    <wt-tooltip v-show="!playing">
      <template v-slot:activator>
        <wt-icon-btn
          icon="play"
          @click="$emit('play')"
        ></wt-icon-btn>
      </template>
      {{ $t('iconHints.play') }}
    </wt-tooltip>
    <iframe
      v-show="playing"
      :src="`${baseUrl}animations/equalizer/eq.html`"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'media-audio-preview-table-action',
  props: {
    playing: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    baseUrl: import.meta.env.BASE_URL, // to resolve iframe equalizer path after build
  }),
};
</script>

<style lang="scss" scoped>
.iframe-wrap {
  overflow: hidden;
  width: var(--icon-md-size);
  height: var(--icon-md-size);
}
</style>
