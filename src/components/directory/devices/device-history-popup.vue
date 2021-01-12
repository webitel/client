<template>
  <wt-popup overflow @close="close">
    <template slot="title">{{ $t('objects.directory.devices.deviceHistory') }}</template>
    <template slot="main">
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datetimepicker
              :value="from"
              :label="$t('objects.from')"
              @change="setHistoryFrom"
          ></wt-datetimepicker>
          <wt-datetimepicker
              :value="to"
              :label="$t('objects.to')"
              @change="setHistoryTo"
          ></wt-datetimepicker>
        </div>
        <div class="table-wrapper">
          <wt-table
              :headers="headers"
              :data="dataList"
              :selectable="false"
              :grid-actions="false"
          >
            <template slot="loggedIn" slot-scope="{ item }">
              {{ prettifyLoggedIn(item.loggedIn) }}
            </template>
            <template slot="loggedOut" slot-scope="{ item }">
              {{ prettifyLoggedOut(item.loggedOut) }}
            </template>
            <template slot="user" slot-scope="{ item }">
              <div v-if="item.user">
                {{ item.user.name }}
              </div>
            </template>
          </wt-table>
          <wt-pagination
              :size="size"
              :next="isNext"
              :prev="page > 1"
              debounce
              @next="nextPage"
              @prev="prevPage"
              @input="setSize"
              @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
    <template slot="actions">
      <wt-button @click="close">{{ $t('objects.ok') }}</wt-button>
      <wt-button color="secondary" @click="close"> {{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import tableComponentMixin from '../../../mixins/tableComponentMixin';

export default {
  name: 'device-history-popup',
  mixins: [tableComponentMixin],
  data() {
    return {
      headers: [
        { value: 'user', text: this.$tc('objects.directory.users.users', 1) },
        { value: 'loggedIn', text: this.$t('objects.directory.devices.loggedIn') },
        { value: 'loggedOut', text: this.$t('objects.directory.devices.loggedOut') },
      ],
    };
  },

  computed: {
    ...mapState('directory/devices/history', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      from: (state) => state.from,
      to: (state) => state.to,
      isNext: (state) => state.isNextPage,
    }),
  },

  methods: {
    ...mapActions('directory/devices/history', {
      loadDataList: 'LOAD_HISTORY_DATA_LIST',
      setSize: 'SET_HISTORY_SIZE',
      setSearch: 'SET_HISTORY_SEARCH',
      setHistoryFrom: 'SET_HISTORY_FROM',
      setHistoryTo: 'SET_HISTORY_TO',
      nextPage: 'NEXT_HISTORY_PAGE',
      prevPage: 'PREV_HISTORY_PAGE',
    }),

    prettifyLoggedIn(time) {
      return new Date(+time).toLocaleString();
    },

    prettifyLoggedOut(time) {
      if (!time) return 'none';
      return new Date(+time).toLocaleString();
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';

.history-popup__filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-bottom: 20px;
}

.wt-table {
  max-height: 40vh;
}
</style>
