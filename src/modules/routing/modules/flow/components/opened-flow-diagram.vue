<template>
  <section class="flow-diagram">
    <wt-loader v-show="isLoading"></wt-loader>
    <div id="flow-diagram" v-show="!isLoading"></div>
  </section>
</template>

<script>
import usersAPI from '../../../../directory/modules/users/api/users';
import calendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import flowsAPI from '../api/flow';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

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
    async initDiagram() {
      const script = document.createElement('script');
      script.src = 'https://dev.webitel.com/flow-diagram/WtFlowDiagram.umd.min.js';
      script.onload = () => {
        const params = {
          diagram: this.isEdit ? this.itemInstance : null, // if edit, restore diagram
          config: {
            search: {
              users: usersAPI.getLookup,
              calendars: calendarsAPI.getLookup,
              flows: flowsAPI.getLookup,
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
        this.diagram.on(WtFlowDiagram.Event.SAVE, onSave);
        this.diagram.on(WtFlowDiagram.Event.CLOSE, this.close.bind(this));

        console.info(JSON.stringify(this.itemInstance.payload));

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
    save(callback) {
      this.$emit('save', callback);
    },
    close() {
      this.$emit('close');
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
