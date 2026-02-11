<template>
  <div class="copy-input">
    <wt-input-text
      :model-value="value"
      v-bind="{ ...$attrs }"
      @update:model-value="input"
    >
      <template #suffix>
        <wt-copy-action
          :value="copyValue"
        />
      </template>
    </wt-input-text>
  </div>
</template>

<script>
export default {
	name: 'CopyInput',
	props: {
		value: {
			type: String,
		},
		copyModifier: {
			type: Function,
		},
	},
	data() {
		return {
			isCopied: false,
			isMounted: false,
		};
	},
	computed: {
		copyValue() {
			let copyValue;
			if (this.copyModifier) {
				copyValue = this.copyModifier(this.value);
			} else {
				copyValue = this.value;
			}
			return copyValue;
		},
	},

	mounted() {
		this.isMounted = true;
	},

	methods: {
		input(value) {
			this.$emit('input', value);
		},
	},
};
</script>

<style lang="scss" scoped>
.copy-input {
  z-index: 1;
}
</style>
