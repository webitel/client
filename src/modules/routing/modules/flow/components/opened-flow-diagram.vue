<template>
  <section class="flow-diagram">
    <wt-loader v-show="isLoading"></wt-loader>
    <div id="flow-diagram" v-show="!isLoading"></div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { objCamelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';
import calendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-flow-diagram',
  mixins: [openedTabComponentMixin],
  data: () => ({
    diagram: null,
    isLoading: true,
  }),
  methods: {
    ...mapActions({
      save(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_ITEM`, payload);
      },
    }),
    async initDiagram() {
      const script = document.createElement('script');
      script.src = 'https://dev.webitel.com/flow-diagram/WtFlowDiagram.umd.min.js';
      script.onload = () => {
        const config = {
          search: {
            calendars: calendarsAPI.getLookup,
          },
        };
        const WtFlowDiagram = window.WtFlowDiagram.default;
        this.diagram = new WtFlowDiagram('#flow-diagram', config);
        const onSave = ({ schema, payload }) => {
          console.log('save!', payload);
          const name = `visual test--${Math.random()}`;
          this.setItemProp({ prop: 'name', value: name });
          this.setItemProp({ prop: 'schema', value: schema });
          this.setItemProp({ prop: 'payload', value: payload });
          this.save();
        };
        const onClose = () => this.$router.push('/routing/flow');
        this.diagram.on(WtFlowDiagram.Event.SAVE, onSave);
        this.diagram.on(WtFlowDiagram.Event.CLOSE, onClose);

        this.isLoading = false;
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://dev.webitel.com/flow-diagram/WtFlowDiagram.css';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.head.appendChild(link);
    },
  },
  mounted() {
    this.initDiagram();
  },
};
</script>

<style lang="scss" scoped>
.flow-diagram {
  padding: 0 !important; // override .object-content-wrap > *
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;

  .wt-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
