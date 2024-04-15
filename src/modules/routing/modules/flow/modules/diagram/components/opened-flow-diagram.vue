<template>
  <section class="flow-diagram">
  </section>
</template>

<script>

export default {
  name: 'OpenedFlowDiagram',
  created() {
    const flowId = this.$route.params.id || 'new';
    const flowType = this.$route.query.type || '';
    const redirectUrl = `${import.meta.env.VITE_FLOW_DIAGRAM_URL}/${flowId}/${flowType}`;
    window.location.replace(redirectUrl);
  },
};
</script>

<style lang="scss" scoped>


</style>
