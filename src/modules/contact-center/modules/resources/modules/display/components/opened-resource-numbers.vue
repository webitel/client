<template>
  <section>
    <number-popup
      v-if="isNumberPopup"
      @close="closePopup"
    ></number-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.res.numbers', 1) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="callDelete(selectedRows)"
          ></delete-all-action>
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          ></wt-icon-btn>
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          {{ item.display }}
        </template>
        <template v-slot:actions="{ item }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="callDelete(item)"
          ></delete-action>
        </template>
      </wt-table>
      <wt-pagination
        :next="isNext"
        :prev="page > 1"
        :size="size"
        debounce
        @change="loadList"
        @input="setSize"
        @next="nextPage"
        @prev="prevPage"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import NumberPopup from './opened-resource-numbers-popup.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/res';
const subNamespace = 'numbers';

export default {
  name: 'opened-resource-number',
  mixins: [openedObjectTableTabMixin],
  components: { NumberPopup },
  data: () => ({
    namespace,
    subNamespace,
    isNumberPopup: false,
  }),

  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}` });
    return { dummy };
  },

  methods: {
    openPopup() {
      this.isNumberPopup = true;
    },
    closePopup() {
      this.isNumberPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
