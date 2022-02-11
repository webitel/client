<template>
  <div class="copy-input">
    <wt-input
      v-bind="{ ...$attrs }"
      :value="value"
      @input="input"
    >
      <template slot="after-input">
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
      </template>
    </wt-input>
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
