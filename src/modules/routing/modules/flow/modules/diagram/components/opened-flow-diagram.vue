<template>
  <section class="flow-diagram">
    <!--    full page overlay is needed to prevent flow-diagram on-load glitching bugs -->
    <div
      v-show="isLoading"
      class="flow-diagram__loading-overlay"
    >
      <wt-loader></wt-loader>
    </div>
    <div
      id="flow-diagram"
    ></div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import queuesAPI from '../../../../../../contact-center/modules/queues/api/queues';
import usersAPI from '../../../../../../directory/modules/users/api/users';
import BlacklistsAPI from '../../../../../../lookups/modules/blacklists/api/blacklists';
import bucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import calendarsAPI from '../../../../../../lookups/modules/calendars/api/calendars';
import CommunicationsAPI from '../../../../../../lookups/modules/communications/api/communications';
import mediaAPI from '../../../../../../lookups/modules/media/api/media';
import ChatGatewaysAPI from '../../../../chat-gateways/api/chatGateways';
import gatewaysAPI from '../../../../gateways/api/gateways';
import FlowsAPI from '../../../api/flow';
import RolesAPI from '../../../../../../permissions/modules/roles/api/roles';

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
          // if edit, restore diagram
          diagram: {
            ...this.itemInstance,
            // parse payload to restore it from stringify onSave because of case-convertion
            payload: typeof this.itemInstance.payload === 'string'
              ? JSON.parse(this.itemInstance.payload)
              : this.itemInstance.payload,
          },
          config: {
            search: {
              users: usersAPI.getLookup,
              calendars: calendarsAPI.getLookup,
              flows: FlowsAPI.getLookup,
              media: mediaAPI.getLookup,
              queues: queuesAPI.getLookup,
              buckets: bucketsAPI.getLookup,
              gateways: gatewaysAPI.getLookup,
              lists: BlacklistsAPI.getLookup,
              communications: CommunicationsAPI.getLookup,
              roles: () => RolesAPI.getExtendedRoles({ fields: ['name', 'id', 'user'] }),
              chatGateways: ({ provider, ...rest }) => ChatGatewaysAPI
              .getLookup({ rest: { provider }, ...rest }),
              flowTags: FlowsAPI.getFlowTags,
            },
          },
        };
        const WtFlowDiagram = window.WtFlowDiagram.default;
        this.diagram = new WtFlowDiagram('#flow-diagram', params);

        const onSave = async ({
                                name,
                                type,
                                tags,
                                schema,
                                payload,
                              }) => {
          await Promise.all([
            this.setItemProp({ prop: 'name', value: name }),
            this.setItemProp({ prop: 'type', value: type }),
            this.setItemProp({ prop: 'tags', value: tags }),
            this.setItemProp({ prop: 'schema', value: schema }),
            this.setItemProp({ prop: 'payload', value: JSON.stringify(payload) }), // stringify payload to prevent it from case-convertion
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
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 !important; // override .object-content-wrap > *
}

#flow-diagram {
  height: 100%;
}

.flow-diagram__loading-overlay {
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background: var(--page-bg-color);

  .wt-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
