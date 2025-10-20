<template>
  <div class="one-plus-many-table-cell">
    <a
      v-if="props.collection.length"
      tabindex="0"
    >
      {{ props.collection[0].name }}
    </a>

    <div
      class="one-plus-many-table-cell__chip"
      @click.prevent="inputHandler"
      @keydown.enter.prevent="inputHandler"
    >
      <wt-chip v-if="props.collection.length > 1">
        +{{ props.collection.length - 1 }}
      </wt-chip>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  collection: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['input']);

const inputHandler = () => {
  emit('input');
};
</script>

<style lang="scss" scoped>
.one-plus-many-table-cell {
  display: flex;
  align-items: center;

  a {
    color: inherit;
  }

  &__chip {
    margin-left: 8px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }
}
</style>
