<template>
  <section class="content-wrapper">
    <hook-popup
      v-if="isHookPopup"
      @close="closePopup"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.ccenter.queues.hooks.hooks', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
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
      :dark-mode="darkMode"
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
        <template #event="{ item }">
          {{ $t(`objects.ccenter.queues.hooks.eventTypes.${item.event}`) }}
        </template>
        <template #schema="{ item }">
          {{ item.schema.name }}
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="!hasEditAccess"
            :value="item.enabled"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          />
        </template>
        <template #actions="{ item }">
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
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy.js';
import HookPopup from './opened-queue-hooks-popup.vue';

const namespace = 'ccenter/queues';
const subNamespace = 'hooks';

export default {
  name: 'OpenedQueueHooks',
  components: { HookPopup },
  mixins: [openedObjectTableTabMixin],
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy }
  },
  data: () => ({
    namespace,
    subNamespace,
    isHookPopup: false,
  }),

  methods: {
    openPopup() {
      this.isHookPopup = true;
    },
    closePopup() {
      this.isHookPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
