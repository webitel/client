<template>
  <wt-popup v-bind="$attrs" :shown="!!isHistoryOpened" overflow @close="close">
    <template #title>
      {{ $t('objects.directory.devices.deviceHistory') }}
    </template>
    <template #main>
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datepicker :label="$t('objects.from')" :value="from" mode="datetime" @input="selectForm" />
          <wt-datepicker :label="$t('objects.to')" :value="to" mode="datetime" @input="selectTo" />
        </div>
        <div class="table-section__table-wrapper">
          <wt-table :data="dataList" :grid-actions="false" :headers="headers" :selectable="false">
            <template #loggedIn="{ item }">
              {{ prettifyTime(item.loggedIn) }}
            </template>
            <template #loggedOut="{ item }">
              {{ prettifyTime(item.loggedOut) }}
            </template>
            <template #user="{ item }">
              <div v-if="item.user">
                {{ item.user.name }}
              </div>
            </template>
          </wt-table>
          <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
            @next="nextPage" @prev="prevPage" />
        </div>
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
import historyPopupMixin from '../../../../../app/mixins/objectPagesMixins/historyPopupMixin/historyPopupMixin';

export default {
	name: 'DeviceHistoryPopup',
	mixins: [
		historyPopupMixin,
	],
	data: () => ({
		namespace: 'directory/devices/history',
	}),

	computed: {
		headers() {
			return [
				{
					value: 'user',
					text: this.$t('objects.user'),
				},
				{
					value: 'loggedIn',
					text: this.$t('objects.directory.devices.loggedIn'),
				},
				{
					value: 'loggedOut',
					text: this.$t('objects.directory.devices.loggedOut'),
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped></style>
