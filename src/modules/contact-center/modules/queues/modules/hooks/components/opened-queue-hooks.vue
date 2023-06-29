<template>
  <section>
    <hook-popup
      v-if="isHookPopup"
      @close="closePopup"
    ></hook-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.queues.hooks.hooks', 2) }}</h3>
      <div class="content-header__actions-wrap">
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
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template v-slot:event="{ item }">
          {{ $t(`objects.ccenter.queues.hooks.eventTypes.${item.event}`) }}
        </template>
        <template v-slot:schema="{ item }">
          {{ item.schema.name }}
        </template>
        <template v-slot:state="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            :disabled="!hasEditAccess"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          ></wt-switcher>
        </template>
        <template v-slot:actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          ></wt-icon-action>
          <wt-icon-action
            action="delete"
            class="table-action"
            @click="callDelete(item)"
          ></wt-icon-action>
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
import HookPopup from './opened-queue-hooks-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-queue-hooks',
  mixins: [openedObjectTableTabMixin],
  components: { HookPopup },
  data: () => ({
    subNamespace: 'hooks',
    isHookPopup: false,

    isDeleteConfirmation: false,
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
