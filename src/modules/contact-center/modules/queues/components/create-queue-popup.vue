<template>
  <selection-popup
    v-bind="$attrs"
    :shown="!!type"
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
    type() {
      return this.$route.query.type;
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

  watch: {
    type: {
      handler(index) {
        this.selected = this.options[+index];
      }, immediate: true,
   }
  }
};
</script>

<style lang="scss" scoped>

</style>
