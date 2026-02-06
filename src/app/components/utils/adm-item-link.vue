<template>
  <wt-item-link
    v-if="hasId && hasRouteName"
    :link="link"
    v-bind="attrs"
  >
    <slot />
  </wt-item-link>
  <span v-else class="adm-item-link__fallback">
    <slot />
  </span>
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

const hasId = computed(() => Boolean(props.id));

const hasRouteName = computed(() => Boolean(props.routeName));

const link = computed(() => {
  return {
    name: `${props.routeName}-card`,
    params: { id: props.id }
  };
});
</script>

<style lang="scss" scoped>
.adm-item-link__fallback {
  display: flex;
  align-items: center;
}
</style>
