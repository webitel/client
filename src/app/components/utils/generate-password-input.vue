<template>
  <div class="generate-password-input">
    <wt-input
      :disabled="disabled"
      :label="$t('objects.password')"
      :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
      :placeholder="$t('objects.password')"
      :required="required"
      :v="v"
      :value="passwordRepresentation"
      @input="input"
    >
      <template
        v-if="!disabled"
        #after-input
      >
        <wt-copy-action
          v-show="passwordRepresentation"
          :value="value"
        />
        <wt-tooltip
          class="generate-password-input__icon-btn generate-password-input__icon-btn--generate"
        >
          <template #activator>
            <wt-icon-btn
              icon="generate"
              @click="generatePassword"
            />
          </template>
          {{ $t('iconHints.generate') }}
        </wt-tooltip>
      </template>
    </wt-input>
  </div>
</template>

<script>
const MIN_HASH_SIZE = 59;

export default {
  name: "GeneratePasswordInput",
  props: {
    value: {
      type: String,
      default: "",
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

  computed: {
    passwordRepresentation() {
      return this.value.length <= MIN_HASH_SIZE ? this.value : "";
    },
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    generatePassword() {
      const length = 12;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let value = "";
      for (let i = 0; i < length; i += 1) {
        value += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this.input(value);
    },

    input(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.generate-password-input {
  position: relative;
  z-index: 1;
}

.generate-password-input__label-wrapper {
  display: flex;
  align-items: center;
}

.generate-password-input__icon-btn {
  margin-left: var(--spacing-xs);
}
</style>
