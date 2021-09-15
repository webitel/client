<template>
  <section id="wt-flow-diagram"></section>
</template>

<script>
export default {
  name: 'opened-flow-diagram',
  data: () => ({
    diagram: null,
  }),
  methods: {
    initDiagram() {
      const script = document.createElement('script');
      script.src = 'https://dev.webitel.com/flow-diagram/WtFlowDiagram.umd.min.js';
      script.onload = () => {
        const config = {
        };
        this.diagram = new window.WtFlowDiagram.default('#wt-flow-diagram', config);
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

</style>
