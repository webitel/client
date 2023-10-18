<template>
  <selection-popup
    v-model="selected"
    :options="options"
    :title="$t('objects.ccenter.queues.newQueue')"
    @close="$emit('close')"
    @select="createQueue"
  ></selection-popup>
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

export default {
  name: 'create-queue-popup',
  components: { SelectionPopup },
  data: () => ({
    selected: null,
  }),

  created() {
    // eslint-disable-next-line prefer-destructuring
    this.selected = this.options[0];
  },

  computed: {
    options() {
      return Object.entries(QueueTypeProperties).map(([type, { locale }]) => ({
        value: type, // popup identifies selected option by "value"
        type,
        title: this.$t(locale),
        description: this.$t(`${locale}Description`),
      }));
    },
  },

  methods: {
    createQueue() {
      this.$router.push({ path: '/contact-center/queues/new', query: { type: this.selected.type } });
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
