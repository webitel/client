<template>
  <div class="iframe-wrap">
    <wt-tooltip v-show="!playing">
      <template #activator>
        <wt-icon-btn
          icon="play"
          @click="$emit('play')"
        />
      </template>
      {{ $t('iconHints.play') }}
    </wt-tooltip>
    <iframe
      v-show="playing"
      :src="`${baseUrl}animations/equalizer/eq.html`"
    />
  </div>
</template>

<script>
export default {
  name: "MediaAudioPreviewTableAction",
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
