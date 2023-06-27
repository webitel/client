<template>
  <section>
    <res-popup
      v-if="isResPopup"
      @close="closePopup"
    ></res-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.res.res', 2) }}</h3>
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
          <div v-if="item.resource">
            {{ item.resource.name }}
          </div>
        </template>

        <template v-slot:priority="{ item }">
          <div v-if="item.priority">
            {{ item.priority }}
          </div>
        </template>

        <template v-slot:reserveResource="{ item }">
          <div v-if="item.reserveResource">
            {{ item.reserveResource.name }}
          </div>
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
import ResPopup from './opened-resource-group-resource-popup.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/resGroups';
const subNamespace = 'res';

export default {
  name: 'opened-resource-group-resources',
  mixins: [openedObjectTableTabMixin],
  components: { ResPopup },
  data: () => ({
    namespace,
    subNamespace,
    isResPopup: false,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}` });
    return { dummy };
  },
  methods: {
    openPopup() {
      this.isResPopup = true;
    },
    closePopup() {
      this.isResPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
