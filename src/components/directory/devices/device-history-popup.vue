<template>
  <wt-popup overflow @close="close">
    <template slot="title">{{ $t('objects.directory.devices.deviceHistory') }}</template>
    <template slot="main">
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datetimepicker
            :value="from"
            :label="$t('objects.from')"
            @change="setFrom"
          ></wt-datetimepicker>
          <wt-datetimepicker
            :value="to"
            :label="$t('objects.to')"
            @change="setTo"
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
              {{ prettifyTime(item.loggedIn) }}
            </template>
            <template slot="loggedOut" slot-scope="{ item }">
              {{ prettifyTime(item.loggedOut) }}
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
import historyPopupMixin from '../../../mixins/objectPagesMixins/historyPopupMixin/historyPopupMixin';

export default {
  name: 'device-history-popup',
  mixins: [historyPopupMixin],
  data: () => ({
    namespace: 'directory/devices/history',
  }),

  computed: {
    headers() {
      return [
        { value: 'user', text: this.$tc('objects.directory.users.users', 1) },
        { value: 'loggedIn', text: this.$t('objects.directory.devices.loggedIn') },
        { value: 'loggedOut', text: this.$t('objects.directory.devices.loggedOut') },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
