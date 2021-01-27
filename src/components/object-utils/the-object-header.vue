<template>
  <wt-headline>
    <template slot="title-wrapper">
      <slot>
        <template slot="title">
          <slot name="title"></slot>
        </template>
      </slot>
    </template>
    <template slot="actions">
      <wt-button
          v-if="!hidePrimary"
          :disabled="primaryDisabled"
          @click="primaryAction"
      >
        {{ primaryText || $t('objects.add') }}
      </wt-button>
      <wt-button
          v-if="!hideSecondary"
          color="secondary"
          @click="secondaryActionHelper"
      >
        {{ secondaryText || $t('objects.close') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script>
export default {
  name: 'the-object-header',
  props: {
    hidePrimary: {
      type: Boolean,
      default: false,
    },
    primaryText: {
      type: String,
    },
    primaryAction: {
      type: Function,
    },
    primaryDisabled: {
      type: Boolean,
      default: false,
    },
    secondaryText: {
      type: String,
    },
    secondaryAction: {
      type: Function,
    },
    close: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    // FIXME: REPLACE "CLOSE" WITH SECONDARY_ACTION AND DELETE AFTER REFACTOR
    secondaryActionHelper() {
      return this.secondaryAction ? this.secondaryAction : this.back;
    },
    hideSecondary() {
      return !(this.close || this.secondaryAction || this.secondaryText);
    },
  },

  methods: {
    back() {
      this.$emit('close');
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>

.wt-headline {
  .wt-button {
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
