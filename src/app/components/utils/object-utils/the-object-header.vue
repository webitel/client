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
      <slot name="actions"></slot>
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
          @click="secondaryAction"
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
  },

  computed: {
    hideSecondary() {
      return !(this.secondaryAction || this.secondaryText);
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-headline {
  .wt-button {
    margin-left: var(--spacing-sm);

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
