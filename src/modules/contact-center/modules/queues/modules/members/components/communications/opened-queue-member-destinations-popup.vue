<template>
  <wt-popup @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.queues.destination', 2) }}
    </template>
    <template v-slot:main>
      <section class="destinations-popup">
        <wt-table
            class="popup-table"
            :headers="headers"
            :data="communications"
            :selectable="false"
            :grid-actions="false"
        >
          <template slot="destination" slot-scope="{ item }">
            {{ item.destination }}
          </template>
          <template slot="type" slot-scope="{ item }">
            <div v-if="item.type">
              {{ item.type.name }}
            </div>
          </template>
          <template slot="priority" slot-scope="{ item }">
            {{ item.priority }}
          </template>
        </wt-table>
      </section>
    </template>
    <template slot="actions">
      <wt-button @click="close">{{ $t('objects.ok') }}</wt-button>
      <wt-button color="secondary" @click="close">{{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import tableComponentMixin from '../../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';

export default {
  name: 'opened-queue-member-destinations-popup',
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
        { value: 'destination', text: this.$tc('objects.ccenter.queues.destination', 1) },
        { value: 'type', text: this.$t('objects.ccenter.queues.type') },
        { value: 'priority', text: this.$t('objects.ccenter.queues.priority') },
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
.destinations-popup {
}
</style>
