<template>
  <section class="flow-diagram">
    <div id="flow-diagram"></div>
  </section>
</template>

<script>
import calendarsAPI from '../../../../lookups/modules/calendars/api/calendars';

export default {
  name: 'opened-flow-diagram',
  data: () => ({
    diagram: null,
  }),
  methods: {
    async initDiagram() {
      const script = document.createElement('script');
      script.src = 'https://dev.webitel.com/flow-diagram/WtFlowDiagram.umd.min.js';
      script.onload = () => {
        const config = {
          search: {
            calendars: calendarsAPI.getLookup,
          },
        };
        this.diagram = new window.WtFlowDiagram.default('#flow-diagram', config);
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
}
</style>
