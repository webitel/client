<template>
  <div class="copy-input">
    <wt-input
      v-bind="{ ...$attrs }"
      :value="value"
      @input="input"
    >
      <template v-slot:after-input>
        <copy-action
          :value="copyValue"
        ></copy-action>
      </template>
    </wt-input>
  </div>
</template>

<script>
export default {
  name: 'copy-input',
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

  mounted() {
    this.isMounted = true;
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
