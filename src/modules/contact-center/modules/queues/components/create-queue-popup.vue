<template>
  <selection-popup
    v-bind="$attrs"
    :shown="!!isNew"
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
    isNew() {
      return this.$route.query.new
    }
  },

  methods: {
    createQueue() {
      this.$router.push({ path: `/contact-center/queues/new/${this.selected.subpath}` });
    },
  },

  watch: {
   isNew: {
     handler() {
       this.selected = this.options[0];
     }, immediate: true
   }
  }
};
</script>

<style lang="scss" scoped>

</style>
