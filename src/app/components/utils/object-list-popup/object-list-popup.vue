<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ title }}
    </template>
    <template slot="main">
      <section>
        <wt-table
          :data="dataList"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
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
      default: () => [
        { value: 'name', text: 'name' },
      ],
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
