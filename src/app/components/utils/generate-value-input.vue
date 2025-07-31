<template>
  <div class="generate-value-input">
    <wt-input
      :disabled="disabled"
      :label="label"
      :label-props="labelProps"
      :placeholder="placeholder"
      :required="required"
      :v="v"
      :value="valueRepresentation"
      @input="input"
    >
      <template
        v-if="!disabled"
        #after-input
      >
        <wt-copy-action
          v-show="valueRepresentation"
          :value="value"
        />

        <div
          class="generate-value-input__icon-btn generate-value-input__icon-btn--generate"
        >
          <wt-icon-btn
            v-tooltip="$t('iconHints.generate')"
            icon="generate"
            @click="generateValue"
          />
        </div>
      </template>
    </wt-input>
  </div>
</template>

<script>
const MIN_HASH_SIZE = 59;

export default {
  name: 'GenerateValueInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    labelProps: {
      type: Object,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isCopied: false,
      isMounted: false,
    };
  },

  computed: {
    valueRepresentation() {
      return this.value.length <= MIN_HASH_SIZE ? this.value : '';
    },
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    generateValue() {
      const length = 16;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let value = '';
      for (let i = 0; i < length; i += 1) {
        value += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this.input(value);
    },

    input(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.generate-value-input {
  position: relative;
  z-index: 1;
}

.generate-value-input__label-wrapper {
  display: flex;
  align-items: center;
}

.generate-value-input__icon-btn {
  margin-left: var(--spacing-xs);
}
</style>
