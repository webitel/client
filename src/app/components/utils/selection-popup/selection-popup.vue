<template>
  <wt-popup
    class="selection-popup"
    :min-width="minWidth"
    @close="close"
  >
    <template slot="title">{{ title }}</template>
    <template slot="main">
      <section class="popup-flows">
        <article class="popup-flows__flow">
          <!--Change images to SVG!!!-->
          <img :src="diagram.image" :alt="diagram.alt">
          <div
            class="popup-flows__flow-button-imitation"
            @click="selectOption(diagram)"
            :class="{'active': diagram === selected}"
          >
            <h4 class="popup-flows__flow-button-imitation-title">{{ diagram.title }}</h4>
            <wt-icon
              v-if="diagram.icon"
              :icon="diagram.icon"
              size="sm"
            ></wt-icon>
            <wt-icon-btn
              v-if="diagram.description"
              icon="rounded-info"
              color="outline"
              :tooltip="diagram.description"
              tooltip-position="bottom"
            ></wt-icon-btn>
          </div>
        </article>

        <article class="popup-flows__flow">
          <!--Change images to SVG!!!-->
          <img :src="code.image" :alt="code.alt">
          <div
            class="popup-flows__flow-button-imitation"
            @click="selectOption(code)"
            :class="{'active': code === selected}"
          >
            <h4 class="popup-flows__flow-button-imitation-title">{{ code.title }}</h4>
            <wt-icon
              v-if="code.icon"
              :icon="code.icon"
              size="sm"
            ></wt-icon>
            <wt-icon-btn
              v-if="code.description"
              icon="rounded-info"
              color="outline"
              :tooltip="code.description"
              tooltip-position="left"
            ></wt-icon-btn>
          </div>
        </article>
      </section>
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
    diagram: {
      type: Object,
      default: () => {
      },
    },
    code: {
      type: Object,
      default: () => {
      },
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
  .popup-flows {
    margin-top: 20px;
    display: flex;
    //Because a margin between buttons in `wt-popup` is 20px;
    gap: 20px;

    &__flow-button-imitation {
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

    &__flow-button-imitation-title {
      @extend %typo-strong-md;
      grid-column-start: 2;
    }
  }

  .wt-button {
    flex: 1;
  }
}
</style>
