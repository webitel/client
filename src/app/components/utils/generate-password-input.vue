<template>
  <div class="generate-password-input">
    <wt-input
        :value="passwordRepresentation"
        :v="v"
        :label="$t('objects.password')"
        :placeholder="$t('objects.password')"
        :required="required"
        :disabled="disabled"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        @input="input"
    >
      <template
          v-if="!disabled"
          slot="after-input"
        >
          <wt-icon-btn
            v-show="passwordRepresentation && !isCopied"
            class="generate-password-input__icon-btn generate-password-input__icon-btn--copy"
            icon="copy"
            :tooltip="$t('objects.copy')"
            @click="copyPassword"
          ></wt-icon-btn>
          <wt-icon-btn
            v-show="passwordRepresentation && isCopied"
            class="generate-password-input__icon-btn generate-password-input__icon-btn--tick"
            icon="done"
            color="true"
            :tooltip="$t('objects.copied')"
          ></wt-icon-btn>
          <wt-icon-btn
            class="generate-password-input__icon-btn generate-password-input__icon-btn--generate"
            icon="generate"
            :tooltip="$t('iconHints.generate')"
            @click="generatePassword"
          ></wt-icon-btn>
        </template>
    </wt-input>

  </div>
</template>

<script>
import clipboardCopy from 'clipboard-copy';

const MIN_HASH_SIZE = 59;

export default {
  name: 'generate-password-input',
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
    passwordRepresentation() {
      return this.value.length <= MIN_HASH_SIZE ? this.value : '';
    },
  },

  methods: {
    generatePassword() {
      const length = 12;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let value = '';
      for (let i = 0; i < length; i += 1) {
        value += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this.input(value);
    },

    copyPassword() {
      clipboardCopy(this.value);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);
    },

    input(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.generate-password-input {
  position: relative;
}

.generate-password-input__label-wrapper {
  display: flex;
  align-items: center;
}

.generate-password-input__icon-btn {
  margin-left: var(--spacing-xs);

  ::v-deep .wt-tooltip {
    overflow-wrap: normal;
    white-space: nowrap;
  }

  &--tick {
    pointer-events: none;

    ::v-deep .wt-tooltip {
      opacity: 1;
    }
  }
}
</style>
