<template>
  <header class="object-header">
    <div class="object-header__title-wrap">
      <h2 class="object-title">
        <slot></slot>
      </h2>
    </div>

    <div class="btn-controls">
      <btn
          class="btn secondary-btn"
          v-if="close"
          @click.native="back"
      >
        {{ secondaryText || $t('objects.close') }}
      </btn>
      <btn
          class="btn primary-btn"
          v-if="!hidePrimaryAction"
          :disabled="primaryDisabled"
          @click.native="primaryAction"
      >
        {{ primaryText || $t('objects.addNew') }}
      </btn>
    </div>
  </header>
</template>

<script>
import btn from '../utils/btn';

export default {
  name: 'page-header',
  components: {
    btn,
  },
  props: {
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
    close: {
      type: Boolean,
      default: false,
    },
    hidePrimaryAction: {
      type: Boolean,
      default: false,
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
.object-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 68px;
  padding: 15px 30px;
  margin-bottom: 20px;

  background: #fff;
  border-radius: $border-radius;
}

.object-header__title-wrap {
  display: flex;
}

.object-title {
  @extend .typo-heading-lg;

  margin: 0;
  letter-spacing: 0.15px;

  span {
    @extend .typo-heading-lg;
  }
}
</style>
