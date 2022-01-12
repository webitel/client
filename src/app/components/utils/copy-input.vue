<template>
  <div class="copy-input">
    <wt-input
      ref="copy-input"
      :disabled="disabled"
      :label="label"
      :required="required"
      :v="v"
      :value="value"
      @input="input"
    ></wt-input>

    <div :style="iconExtensionStyle" class="copy-input__icon-extension">
      <wt-icon-btn
        v-show="!isCopied"
        :tooltip="$t('objects.copy')"
        class="copy-input__icon-btn copy-input__icon-btn--copy"
        icon="copy"
        @click="copy"
      ></wt-icon-btn>
      <wt-icon-btn
        v-show="isCopied"
        :tooltip="$t('objects.copied')"
        class="copy-input__icon-btn copy-input__icon-btn--tick"
        color="true"
        icon="done"
      ></wt-icon-btn>
    </div>
  </div>
</template>

<script>
import clipboardCopy from 'clipboard-copy';

export default {
  name: 'copy-input',
  props: {
    value: {
      type: String,
    },
    copyModifier: {
      type: Function,
    },
    label: {
      type: String,
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
    iconExtensionStyle() {
      if (!this.isMounted) return '';
      const inputHeight = this.$refs['copy-input'].$el.querySelector('input').offsetHeight;
      const magicHeightNumber = -3; // dunno why, but it centers icons
      return `top: ${inputHeight + magicHeightNumber}px;`;
    },
  },

  methods: {
    copy() {
      let copyValue;
      if (this.copyModifier) {
        copyValue = this.copyModifier(this.value);
      } else {
        copyValue = this.value;
      }
      clipboardCopy(copyValue);
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
.copy-input {
  position: relative;
}

.copy-input__label-wrapper {
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

.copy-input__icon-extension {
  display: flex;
  position: absolute;
  // top: 35px; // middle of input field
  right: 9px; // input right padding
}

.copy-input__icon-btn {
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
