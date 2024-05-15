<template>
  <wt-item-link
    :link="link"
    v-bind="attrs"
  >
    <slot />
  </wt-item-link>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import RouteNames from '../../router/_internals/RouteNames.enum.js';

const props = defineProps({
  routeName: {
    type: String,
    required: true,
    validator: (v) => Object.values(RouteNames).includes(v),
  },
  id: {
    type: [String, Number],
    required: true,
  },
});

const attrs = useAttrs();

const link = computed(() => {
  return {
    name: `${props.routeName}-card`,
    params: { id: props.id },
  };
});
</script>

<style lang="scss" scoped>

</style>
