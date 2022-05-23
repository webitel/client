<template>
  <section class="flow-diagram">
    <wt-loader v-show="isLoading"></wt-loader>
    <div id="flow-diagram" v-show="!isLoading"></div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import usersAPI from '../../../../directory/modules/users/api/users';
import calendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import mediaAPI from '../../../../lookups/modules/media/api/media';
import bucketsAPI from '../../../../lookups/modules/buckets/api/buckets';
import queuesAPI from '../../../../contact-center/modules/queues/api/queues';
import gatewaysAPI from '../../gateways/api/gateways';
import flowsAPI from '../api/flow';
import BlacklistsAPI from '../../../../lookups/modules/blacklists/api/blacklists';
import CommunicationsAPI from '../../../../lookups/modules/communications/api/communications';

export default {
  name: 'opened-flow-diagram',
  mixins: [openedTabComponentMixin],
  data: () => ({
    diagram: null,
    isLoading: true,
  }),
  computed: {
    isEdit() {
      return !!this.$route.params?.id;
    },
  },
  methods: {
    ...mapActions({
      resetItemId(dispatch) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, 0);
      },
    }),

    async initDiagram() {
      const flowDiagramUrl = process.env.VUE_APP_FLOW_DIAGRAM_URL;
      const script = document.createElement('script');
      script.src = `${flowDiagramUrl}/WtFlowDiagram.umd.min.js`;
      script.onload = () => {
        const params = {
          diagram: this.isEdit ? this.itemInstance : null, // if edit, restore diagram
          config: {
            search: {
              users: usersAPI.getLookup,
              calendars: calendarsAPI.getLookup,
              flows: flowsAPI.getLookup,
              media: mediaAPI.getLookup,
              queues: queuesAPI.getLookup,
              buckets: bucketsAPI.getLookup,
              gateways: gatewaysAPI.getLookup,
              lists: BlacklistsAPI.getLookup,
              communications: CommunicationsAPI.getLookup,
            },
          },
        };
        const WtFlowDiagram = window.WtFlowDiagram.default;
        this.diagram = new WtFlowDiagram('#flow-diagram', params);

        const onSave = async ({ name, schema, payload }) => {
          await Promise.all([
            this.setItemProp({ prop: 'name', value: name }),
            this.setItemProp({ prop: 'schema', value: schema }),
            this.setItemProp({ prop: 'payload', value: payload }),
          ]);
          return new Promise((resolve) => {
            this.save(resolve);
          });
        };

        const onSaveAs = async (params) => {
          await this.resetItemId();
          return onSave(params);
        };

        const onInitialize = () => {
          this.isLoading = false;
        };

        this.diagram.on(WtFlowDiagram.Event.SAVE, onSave);
        this.diagram.on(WtFlowDiagram.Event.SAVE_AS, onSaveAs);
        this.diagram.on(WtFlowDiagram.Event.CLOSE, this.close.bind(this));
        this.diagram.on(WtFlowDiagram.Event.INITIALIZE, onInitialize);
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = `${flowDiagramUrl}/WtFlowDiagram.css`;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.head.appendChild(link);
    },
    save(callback) {
      this.$emit('save', callback);
    },
    close() {
      this.$emit('close');
    },
  },
  watch: {
    itemInstance: {
      handler() {
        if (
          (this.isEdit && !this.itemInstance.editor) // if this is empty edit
          || this.diagram // if diagram is already created
        ) return;
        this.initDiagram();
      },
      immediate: true,
    },
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
  z-index: 100;

  .wt-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 0, 0, 0.3);
  z-index: 10000;
  pointer-events: none;
}
</style>
