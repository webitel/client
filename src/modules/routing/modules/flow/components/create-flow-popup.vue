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
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';

export default {
  name: 'create-flow-popup',
  components: { SelectionPopup },

  data: () => ({
    selected: null,
  }),
  computed: {
    options() {
      const diagram = {
        value: 'diagram',
        title: this.$t('objects.routing.flow.diagram.diagram').concat(' CURRENTLY IN DEVELOPMENT. USE ONLY FOR TEST PURPOSES!'),
        description: this.$t('objects.routing.flow.diagram.description'),
      };
      const code = {
        value: 'code',
        title: this.$t('objects.routing.flow.code.code'),
        description: this.$t('objects.routing.flow.code.description'),
      };
      return [diagram, code];
    },
  },

  methods: {
    selectOption(option) {
      this.selected = option;
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