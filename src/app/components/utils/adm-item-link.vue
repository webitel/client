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
  type: {
    type: String,
    required: false,
  },
});
const attrs = useAttrs();
const link = computed(() => {
  let params= { id: props.id };
  if (props.type) params.type = props.type;

  return {
    name: `${props.routeName}-card`,
    params,
  };
});
</script>

<style lang="scss" scoped>
</style>
