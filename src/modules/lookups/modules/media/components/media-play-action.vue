<template>
  <div class="media-play-action">
    <wt-icon-btn
      v-show="!playing"
      v-tooltip="t('iconHints.play')"
      icon="play"
      @click="emit('play')"
    />

    <iframe
      v-show="playing"
      class="media-play-action__equalizer"
      :src="`${baseUrl}animations/equalizer/eq.html`"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

withDefaults(
	defineProps<{
		playing?: boolean;
	}>(),
	{
		playing: false,
	},
);

const emit = defineEmits<{
	play: [];
}>();

const { t } = useI18n();

const baseUrl = import.meta.env.BASE_URL; // to resolve iframe equalizer path after build
</script>

<style scoped>
.media-play-action {
  overflow: hidden;
  width: var(--icon-md-size);
  height: var(--icon-md-size);
}

/**
  @author @rzaritskyi
  Vidstack player rewrites iframe`s width and height in vidstack/player/styles/base.css.
  So here we need to write sizes explicitly.
**/
.media-play-action__equalizer {
  width: inherit;
  height: inherit;
}
</style>
