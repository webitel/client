<template>
  <selection-popup
    :title="$t('objects.routing.flow.createFlowSelectionPopup')"
    :selected="selected"
    @change="selectOption"
    @select="create"
    @close="close"
  >
    <!--Main flow popup content deed to make in "after-section"
     because in another case a tooltip will display incorrectly,
     and in general this is a specific case-->
    <template slot="after-section">
      <section class="popup-flows">
        <article class="popup-flow-editor">
          <!--Change images to SVG!!!-->
          <img :src="diagram.image" :alt="diagram.alt">
          <div
            class="popup-flow-editor__button-wrapper"
            @click="selectOption(diagram)"
            :class="{'active': diagram === selected}"
          >
            <h4 class="popup-flow-editor__title">{{ diagram.title }}</h4>
            <wt-icon-btn
              icon="rounded-info"
              color="outline"
              :tooltip="diagram.description"
            ></wt-icon-btn>
          </div>
        </article>

        <article class="popup-flow-editor">
          <!--Change images to SVG!!!-->
          <img :src="code.image" :alt="code.alt">
          <div
            class="popup-flow-editor__button-wrapper"
            @click="selectOption(code)"
            :class="{'active': code === selected}"
          >
            <h4 class="popup-flow-editor__title">{{ code.title }}</h4>
            <wt-icon-btn
              icon="rounded-info"
              color="outline"
              :tooltip="code.description"
              tooltip-position="left"
            ></wt-icon-btn>
          </div>
        </article>
      </section>
    </template>
  </selection-popup>
</template>

<script>
import { mapActions } from 'vuex';
import SelectionPopup
  from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
// Change images to SVG!!!
import codeSelectionPic from '../assets/code-selection-pic.png';
import diagramSelectionPic from '../assets/diagram-selection-pic.png';

export default {
  name: 'create-flow-popup',
  components: { SelectionPopup },

  data: () => ({
    namespace: 'routing/flow',
    selected: null,
  }),
  computed: {
    diagram() {
      return {
        value: 'diagram',
        title: this.$t('objects.routing.flow.diagram.diagram'),
        description: this.$t('objects.routing.flow.diagram.description'),
        image: diagramSelectionPic,
        alt: this.$t('objects.routing.flow.diagram.diagram'),
      };
    },
    code() {
      return {
        value: 'code',
        title: this.$t('objects.routing.flow.code.code'),
        description: this.$t('objects.routing.flow.code.description'),
        image: codeSelectionPic,
        alt: this.$t('objects.routing.flow.code.code'),
      };
    },
  },

  methods: {
    ...mapActions({
      setEditorValue(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),
    selectOption(option) {
      this.selected = option;
      if (this.selected.value === 'diagram') {
        this.setEditorValue({
          prop: 'editor',
          value: true,
        });
      } else {
        this.setEditorValue({
          prop: 'editor',
          value: false,
        });
      }
    },
    create() {
      this.$router.push({
        name: `${RouteNames.FLOW}-new`,
        hash: `#${this.selected.value}`,
      });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
//Change some selection-popup styles
.selection-popup ::v-deep {
  .popup-options {
    display: none;
  }
  .wt-button {
    flex: 1;
  }
}
//Create new specific styles
.popup-flows {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.popup-flow-editor__button-wrapper {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
  padding: 7px 10px;
  border: 1px solid var(--form-border-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover, &.active {
    border-color: var(--main-accent-color);
  }

  .wt-icon-btn {
    margin-left: auto;
    ::v-deep .wt-tooltip {
      width: 300px;
    }
  }
}

.popup-flow-editor__title {
  @extend %typo-strong-md;
  grid-column-start: 2;
  justify-self: center;
}
</style>
