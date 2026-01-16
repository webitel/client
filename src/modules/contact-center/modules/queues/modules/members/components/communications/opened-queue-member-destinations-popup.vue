<template>
  <wt-popup @close="close">
    <template #title>
      {{ $t('objects.ccenter.queues.destination', 2) }}
    </template>
    <template #main>
      <section class="destinations-popup">
        <wt-table :data="communications" :grid-actions="false" :headers="headers" :selectable="false"
          class="popup-table">
          <template #destination="{ item }">
            {{ item.destination }}
          </template>
          <template #type="{ item }">
            <div v-if="item.type">
              {{ item.type.name }}
            </div>
          </template>
          <template #priority="{ item }">
            {{ item.priority }}
          </template>
        </wt-table>
      </section>
    </template>
    <template #actions>
      <wt-button @click="close">
        {{ $t('objects.ok') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import tableComponentMixin from '../../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';

export default {
  name: 'OpenedQueueMemberDestinationsPopup',
  mixins: [tableComponentMixin],
  props: {
    communications: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headers: [
        {
          value: 'destination',
          text: this.$t('objects.ccenter.queues.destination', 1),
        },
        {
          value: 'type',
          text: this.$t('objects.ccenter.queues.type'),
        },
        {
          value: 'priority',
          text: this.$t('objects.ccenter.queues.priority'),
        },
      ],
    };
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.destinations-popup {}
</style>
