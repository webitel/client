<template>
  <wt-popup min-width="480" @close="close">
    <template v-slot:title>
      {{ title }}
    </template>
    <template v-slot:main>
      <section>
        <wt-table
          :data="dataList"
          :grid-actions="false"
          :headers="tableHeaders"
          :selectable="false"
        ></wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'object-list-popup',
  props: {
    title: {
      type: String,
      default: '',
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      description: 'Or default "name" header',
    },
  },
  computed: {
    tableHeaders() {
      const defaultHeaders = [
        { value: 'name', text: this.$t('reusable.name') },
      ];
      return this.headers || defaultHeaders;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
