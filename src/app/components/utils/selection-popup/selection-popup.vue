<template>
  <wt-popup
    class="selection-popup"
    :min-width="minWidth"
    @close="close"
  >
    <template slot="title">{{ title }}</template>
    <template slot="main">
      <ul class="popup-options">
        <li
          class="popup-options__item"
          v-for="(option, key) of options"
          :key="key"
        >
<!--          <img :src="option.image" :alt="option.alt">-->
          <object :data="option.image"></object>
          <div
            class="popup-options__item-wrap"
            :class="{'active': option === selected}"
            @click="selectOption(option)"
          >
            <wt-icon
              v-if="option.icon"
              :icon="option.icon"
              size="sm"
            ></wt-icon>
            <h4 class="popup-options__item-header">{{ option.title }}</h4>
            <wt-icon-btn
              v-if="option.description"
              icon="rounded-info"
              color="outline"
              :tooltip="option.description"
              :tooltip-position="option.value === 'code' ? 'left' : 'bottom'"
            ></wt-icon-btn>
          </div>
        </li>
      </ul>
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
    display: flex;
    //Because a margin between buttons in `wt-popup` is 20px;
    gap: 20px;

    .popup-options__item-wrap {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
      align-items: center;
      padding: 7px 10px;
      border: 1px solid var(--form-border-color);
      border-radius: var(--border-radius);
      transition: var(--transition);
      cursor: pointer;

      .wt-icon {
        margin-right: var(--icon-spacing);
      }

      &:hover, &.active {
        border-color: var(--main-accent-color);
      }

      .wt-icon-btn ::v-deep {
        justify-self: end;

        .wt-tooltip {
          width: 300px;
        }
      }
    }

    .popup-options__item-header {
      @extend %typo-strong-md;
      grid-column-start: 2;
    }
  }

  .wt-button {
    flex: 1;
  }
}
</style>
