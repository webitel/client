<template>
  <section class="table-section">
    <bucket-popup @close="closePopup" />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.lookups.buckets.buckets', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
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
            :disabled="disableUserInput"
            :class="{ 'hidden': anySelected }"
            :selected-count="selectedRows.length"
            @click="deleteData(selectedRows)"
          />
          <wt-icon-btn
            :disabled="disableUserInput"
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
      :dark-mode="darkMode"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="dataList"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          {{ item.bucket.name }}
        </template>
        <template #priority="{ item }">
          {{ item.priority }}
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="!item.disabled"
            @update:model-value="patchItem({ item, index, prop: 'disabled', value: !$event })"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            :disabled="disableUserInput"
            @click="editItem(item)"
          />
          <wt-icon-action
            action="delete"
            :disabled="disableUserInput"
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
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import BucketPopup from './opened-queue-buckets-popup.vue';

const namespace = 'ccenter/queues';
const subNamespace = 'buckets';

export default {
  name: 'OpenedQueueOutboundIvrBuckets',
  components: { BucketPopup },
  mixins: [openedObjectTableTabMixin],
  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
    });
    const { disableUserInput } = useUserAccessControl({
      useUpdateAccessAsAllMutableChecksSource: true,
    });
    return { dummy, disableUserInput };
  },
  data: () => ({
    namespace,
    subNamespace,
    isDeleteConfirmation: false,
  }),
  methods: {
    addItem() {
      return this.$router.push({
        ...this.route,
        params: {
          bucketId: 'new',
        },
      });
    },
    editItem(item) {
      return this.$router.push({
        ...this.route,
        params: {
          bucketId: item.id,
        },
      });
    },
    closePopup() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
