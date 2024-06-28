<template>
  <div>
    <a
      v-if="collection.length"
      class="nameLink"
      tabIndex="0"
      @click.prevent="inputHandler"
      @keypress.enter.prevent="inputHandler"
    >{{ collection[0].name }}</a>
    <wt-chip v-if="collection.length > 1">
      +{{ collection.length - 1 }}
    </wt-chip>
  </div>
</template>

<script>
export default {
	name: "OnePlusManyTableCell",
	props: {
		collection: {
			required: true,
		},
	},
	methods: {
		inputHandler() {
			this.$emit("input");
		},
	},
};
</script>

<style lang="scss" scoped>
.nameLink {
  color: var(--text-main-color);
}

.wt-chip {
  margin-left: var(--spacing-sm);
}
</style>
