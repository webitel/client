<template>
  <selection-popup
    v-bind="$attrs"
    v-model="selected"
    :options="options"
    :title="$t('objects.ccenter.queues.newQueue')"
    @close="$emit('close')"
    @select="createQueue"
  />
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";

export default {
  name: 'CreateQueuePopup',
  components: { SelectionPopup },
  data: () => ({
    selected: null,
  }),

  computed: {
    options() {
      return Object.entries(QueueTypeProperties).map(([type, { locale, subpath }]) => ({
        value: type, // popup identifies selected option by "value"
        subpath,
        title: this.$t(locale),
        description: this.$t(`${locale}Description`),
      }));
    },
  },

  methods: {
    createQueue() {
       this.$router.push({
        ...this.$route,
        name: `${RouteNames.QUEUES}-card`,
        params: { id: 'new' },
        query: { type: this.selected.value },
      })
    },
  },

  created() {
    this.selected = this.options[0];
  },
};
</script>

<style lang="scss" scoped>

</style>
