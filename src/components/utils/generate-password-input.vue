<template>
  <div class="generate-password-input">
    <wt-input
        ref="input-password"
        :value="passwordRepresentation"
        :v="v"
        :required="required"
        @input="input"
    >
      <template slot="label">
        <div class="generate-password-input__label-wrapper">
          {{ $t('objects.password') }}
          <wt-icon-btn
              icon="rounded-info"
              color="outline"
              :tooltip="$t('objects.directory.passwordInfo')"
          ></wt-icon-btn>
        </div>
      </template>
    </wt-input>

    <div class="generate-password-input__icon-extension" :style="iconExtensionStyle">
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
          icon="rounded-tick"
          color="true"
          :tooltip="$t('objects.copied')"
      ></wt-icon-btn>
      <wt-icon-btn
          class="generate-password-input__icon-btn generate-password-input__icon-btn--generate"
          icon="generate"
          :tooltip="$t('iconHints.generate')"
          @click="generatePassword"
      ></wt-icon-btn>
    </div>
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
    },
    v: {
      type: Object,
    },
    required: {
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

    iconExtensionStyle() {
      if (!this.isMounted) return '';
      const inputHeight = this.$refs['input-password'].$el.querySelector('input').offsetHeight;
      const magicHeightNumber = -3; // dunno why, but it centers icons
      return `top: ${inputHeight + magicHeightNumber}px;`;
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

  ::v-deep .wt-label {
    @extend %typo-body-md;
    // change margin due to icon size in label (18px default label height -> 24px with icon)
    margin-bottom: 4px;
  }
}

.generate-password-input__label-wrapper {
  display: flex;
  align-items: center;

  .wt-icon-btn {
    margin-right: 10px;

    ::v-deep {
      .wt-tooltip {
        top: 50%;
        left: auto;
        width: 280px;
        transform: translate(0, -50%);
      }
    }
  }
}

.generate-password-input__icon-extension {
  display: flex;
  position: absolute;
 // top: 35px; // middle of input field
  right: 9px; // input right padding
}

.generate-password-input__icon-btn {
  margin-left: 10px;

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
