<template>
  <wt-popup
    :min-width="minWidth"
    class="selection-popup"
    overflow
    @close="close"
  >
    <template slot="title">{{ title }}</template>
    <template v-slot:main>
        <ul class="popup-options">
          <li
            v-for="(option, key) of options"
            :key="key"
            :class="{'active': option === selected}"
            class="popup-options__item-wrap"
            @click="selectOption(option)"
          >
            <slot name="option" v-bind:option="option">
              <wt-icon
                v-if="option.icon" :icon="option.icon" size="sm"
              ></wt-icon>
              <h4 class="popup-options__item-header">{{ option.title }}</h4>
              <wt-tooltip
                popper-class="selection-popup__tooltip-popper"
              >
                <template v-slot:activator>
                  <wt-icon-btn
                    v-if="option.description"
                    color="outline"
                    icon="rounded-info"
                  ></wt-icon-btn>
                </template>
                {{ option.description }}
              </wt-tooltip>
            </slot>
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
      margin-bottom: 10px;
      padding: 7px 10px;
      cursor: pointer;
      transition: var(--transition);
      border: 1px solid var(--form-border-color);
      border-radius: var(--border-radius);

      .wt-icon {
        margin-right: var(--spacing-xs);
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover, &.active {
        border-color: var(--accent-color);
      }

      .wt-tooltip {
        margin-left: auto;
      }
    }

    .popup-options__item-header {
      @extend %typo-subtitle-2;
    }
  }
}

.selection-popup__tooltip-popper {
  max-width: 480px;
}
</style>
