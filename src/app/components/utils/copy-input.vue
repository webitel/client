<template>
  <div class="copy-input">
    <wt-input
      ref="copy-input"
      :value="value"
      :label="label"
      :v="v"
      :required="required"
      :disabled="disabled"
      @input="input"
    ></wt-input>

    <div class="copy-input__icon-extension" :style="iconExtensionStyle">
      <wt-icon-btn
        v-show="!isCopied"
        class="copy-input__icon-btn copy-input__icon-btn--copy"
        icon="copy"
        :tooltip="$t('objects.copy')"
        @click="copy"
      ></wt-icon-btn>
      <wt-icon-btn
        v-show="isCopied"
        class="copy-input__icon-btn copy-input__icon-btn--tick"
        icon="rounded-tick"
        color="true"
        :tooltip="$t('objects.copied')"
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
