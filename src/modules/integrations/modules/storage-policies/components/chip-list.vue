<template>
<div class="chip-list">

  {{ mainValue }} // тут треба слот, який буде автоматично заповнюватись 1) компьютедом, 2) пропсом ??
  // або, можливо, просто порожній слот?...
  // або без слоту?..

  <wt-tooltip
    v-if="list.length > 1"
    :triggers="props.triggers"
  >
    <template #activator>
      <wt-chip>
        +{{ props.list.length - 1 }}
      </wt-chip>
    </template>

    <p
      v-for="(item) of list.slice(1)"
      :key="item"
    > {{ item }} </p>
    // тут треба слот, який автоматично заповнюватиметься переданим списком,
    // але в нього можна буде підставити що-завгодно замість цього
  </wt-tooltip>
</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  triggers: {
    type: Array,
    default: () => ['click'],
  }
});

</script>

<style lang="scss" scoped>

</style>
