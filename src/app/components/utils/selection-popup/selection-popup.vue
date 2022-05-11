<template>
  <wt-popup
    class="selection-popup"
    overflow
    :min-width="minWidth"
    @close="close"
  >
    <template slot="title">{{ title }}</template>
    <template v-slot:main>
      <ul class="popup-options">
        <li
          class="popup-options__item-wrap"
          v-for="(option, key) of options"
          :class="{'active': option === selected}"
          :key="key"
          @click="selectOption(option)"
        >
          <wt-icon
            v-if="option.icon" :icon="option.icon" size="sm"></wt-icon>
          <h4 class="popup-options__item-header">{{ option.title }}</h4>
          <wt-icon-btn
            v-if="option.description"
            icon="rounded-info"
            color="outline"
            :tooltip="option.description"
          ></wt-icon-btn>
        </li>
      </ul>
      <!--Slot for displaying specific template styling-->
      <slot name="after-section"></slot>
    </template>

    <template slot="actions">
      <wt-button
        :disabled="!selected"
        @click="add"
      >{{ $t('objects.create') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'selection-popup',
  props: {
    title: {
      type: String,
    },
    selected: {
      type: Object,
      description: 'Should have following schema: { value: \'\', title: \'\', description: \'\'}',
    },
    options: {
      type: Array,
      default: () => [],
    },
    minWidth: {
      type: [String, Number],
      default: 480,
    },
  },
  model: {
    prop: 'selected',
    event: 'change',
  },
  methods: {
    add() {
      this.$emit('select', this.selected);
    },
    close() {
      this.$emit('close');
    },
    selectOption(option) {
      this.$emit('change', option);
    },
    isSelected(option) {
      return option === this.selected;
    },
  },
};
</script>

<style lang="scss" scoped>
.selection-popup {
  .popup-options {
    margin-top: 20px;
    padding-right: 10px;

    .popup-options__item-wrap {
      position: relative;
      display: flex;
      align-items: center;
      padding: 7px 10px;
      margin-bottom: 10px;
      border: 1px solid var(--form-border-color);
      border-radius: var(--border-radius);
      transition: var(--transition);
      cursor: pointer;

      .wt-icon {
        margin-right: var(--spacing-xs);
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover, &.active {
        border-color: var(--accent-color);
      }

      .wt-icon-btn {
        margin-left: auto;

        ::v-deep .wt-tooltip {
          width: 300px;
          top: 50%;
          right: calc(100% + 10px);
          left: auto;
          transform: translate(0, -50%);
        }
      }
    }

    .popup-options__item-header {
      @extend %typo-subtitle-2;
    }
  }
}
</style>
