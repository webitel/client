<template>
  <div class="copy-input">
    <wt-input
      :value="value"
      v-bind="{ ...$attrs }"
      @input="input"
    >
      <template #after-input>
        <wt-copy-action
          :value="copyValue"
        />
      </template>
    </wt-input>
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
  position: relative;
}

.copy-input__label-wrapper {
  display: flex;
  align-items: center;

  .wt-icon-btn {
    margin-right: 10px;
  }
}

.copy-input__icon-btn {
  margin-left: 10px;
}
</style>
