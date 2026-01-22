<template>
  <wt-popup v-bind="$attrs" :min-width="minWidth" size="sm" class="selection-popup" @close="close">
    <template #title>
      {{ title }}
    </template>
    <template #main>
      <ul class="popup-options">
        <li v-for="(option, key) of options" :key="key" :class="{ 'active': option.value === selected.value }"
          class="popup-options__item-wrap" @click="selectOption(option)">
          <slot name="option" :option="option">
            <wt-icon v-if="option.icon" :icon="option.icon" size="sm" />

            <h4 class="popup-options__item-header typo-subtitle-2">
              {{ option.title }}
            </h4>

            <div class="popup-options__tooltip-wrapper">
              <wt-icon-btn v-if="option.description"
                v-tooltip="{ value: option.description, class: 'selection-popup__tooltip-popper' }" color="info"
                icon="rounded-info" />
            </div>
          </slot>
        </li>
      </ul>
      <!--Slot for displaying specific template styling-->
      <slot name="after-section" />
    </template>

    <template #actions>
      <wt-button :disabled="!selected" @click="add">
        {{ $t('objects.create') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'SelectionPopup',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    title: {
      type: String,
    },
    selected: {
      type: Object,
      description: "Should have following schema: { value: '', title: '', description: ''}",
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
@use '@webitel/ui-sdk/src/css/main' as *;

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

      &:hover,
      &.active {
        border-color: var(--primary-color);
      }

      .wt-tooltip {
        margin-left: auto;
      }
    }

    .popup-options__tooltip-wrapper {
      margin-left: auto;
    }

  }
}

.selection-popup__tooltip-popper {
  max-width: 480px;
}
</style>
