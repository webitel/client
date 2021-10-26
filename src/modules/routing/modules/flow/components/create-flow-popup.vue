<template>
  <selection-popup
    :title="$t('objects.routing.flow.createFlowSelectionPopup')"
    :options="options"
    :selected="selected"
    @change="selectOption"
    @select="create"
    @close="close"
  ></selection-popup>
</template>

<script>
import { mapActions } from 'vuex';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import SelectionPopup
  from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
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
    options() {
      const diagram = {
        value: 'diagram',
        title: this.$t('objects.routing.flow.diagram.diagram'),
        description: this.$t('objects.routing.flow.diagram.description'),
        image: diagramSelectionPic,
        alt: this.$t('objects.routing.flow.diagram.diagram'),
      };
      const code = {
        value: 'code',
        title: this.$t('objects.routing.flow.code.code'),
        description: this.$t('objects.routing.flow.code.description'),
        image: codeSelectionPic,
        alt: this.$t('objects.routing.flow.code.code'),
      };
      return [diagram, code];
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
        this.setEditorValue({ prop: 'editor', value: true });
      } else {
        this.setEditorValue({ prop: 'editor', value: false });
      }
    },
    create() {
      this.$router.push({ name: `${RouteNames.FLOW}-new`, hash: `#${this.selected.value}` });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
