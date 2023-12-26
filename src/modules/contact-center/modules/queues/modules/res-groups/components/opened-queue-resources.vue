<template>
  <section class="content-wrapper">
    <resource-popup
      v-if="isResGroupPopup"
      @close="closePopup"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.ccenter.resGroups.resGroups', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="deleteData(selectedRows)"
          />
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          <div v-if="item.resourceGroup">
            {{ item.resourceGroup.name }}
          </div>
        </template>
        <template #communication="{ item }">
          <div v-if="item.communication">
            {{ item.communication.name }}
          </div>
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          />
          <wt-icon-action
            action="delete"
            class="table-action"
            @click="deleteData(item)"
          />
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
      />
    </div>
  </section>
</template>

<script>
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import resourcePopup from './opened-queue-resources-popup.vue';

const namespace = 'ccenter/queues';
const subNamespace = 'resGroups';

export default {
  name: 'OpenedQueueResources',
  components: { resourcePopup },
  mixins: [openedObjectTableTabMixin],
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
    isResGroupPopup: false,
    isDeleteConfirmation: false,
  }),
  methods: {
    openPopup() {
      this.isResGroupPopup = true;
    },

    closePopup() {
      this.isResGroupPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
