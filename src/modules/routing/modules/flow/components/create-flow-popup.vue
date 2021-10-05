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
    ...mapActions({
      setEditor(dispatch) {
        return dispatch(`${this.namespace}/SET_EDITOR`);
      },
    }),
    selectOption(option) {
      this.selected = option;
    },
    create() {
      if (this.selected.value === 'diagram') this.setEditor();
      this.$router.push({ name: `${RouteNames.FLOW}-new` });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
