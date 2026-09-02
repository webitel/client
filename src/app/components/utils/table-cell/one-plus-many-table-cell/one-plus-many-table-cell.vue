<template>
  <div
    v-if="props.collection?.length"
    class="one-plus-many-table-cell"
  >
    <span class="one-plus-many-table-cell__value">
      <adm-item-link
        v-if="collection[0].id && routeName"
        :id="collection[0].id"
        :route-name="routeName"
        target="_blank"
      >
        {{ props.collection[0].name }}
      </adm-item-link>
      <span v-else>
        {{ props.collection[0].name }}
      </span>
    </span>

    <div
      v-if="props.collection.length > 1"
      class="one-plus-many-table-cell__chip"
      role="button"
      tabindex="0"
      @click.prevent="inputHandler"
      @keydown.enter.prevent="inputHandler"
    >
      <wt-chip>
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
	routeName: {
		type: String,
		required: false,
		default: null,
	},
});

const emit = defineEmits([
	'input',
]);

const inputHandler = () => {
	emit('input');
};
</script>

<style lang="scss" scoped>
.one-plus-many-table-cell {
  display: flex;
  align-items: center;

  &__chip {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 8px;
    user-select: none;
  }
}
</style>
