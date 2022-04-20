<template>
  <selection-popup
    :title="$t('objects.ccenter.queues.newQueue')"
    :selected="selected"
    :options="options"
    @change="selectOption"
    @select="createQueue"
    @close="close"
  ></selection-popup>
</template>

<script>
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';

export default {
  name: 'create-queue-popup',
  components: { SelectionPopup },
  data: () => ({
    selected: null,
  }),

  created() {
    this.selectOption(this.options[0]);
  },

  computed: {
    options() {
      return Object.entries(QueueTypeProperties).map(([type, { locale }]) => ({
        type,
        title: this.$t(locale),
        description: this.$t(`${locale}Description`),
      }));
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
    selectOption(option) {
      this.selected = option;
    },
    createQueue() {
      if (this.selected) {
        this.$router.push({ path: '/contact-center/queues/new', query: { type: this.selected.type } });
      }
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
