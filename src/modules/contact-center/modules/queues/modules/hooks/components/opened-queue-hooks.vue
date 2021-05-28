<template>
  <section>
    <hook-popup
      v-if="isHookPopup"
      @close="closePopup"
    ></hook-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.queues.hooks.hooks', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :tooltip="$t('iconHints.deleteSelected')"
          class="icon-action"
          icon="bucket"
          @click="deleteSelected"
        ></wt-icon-btn>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
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
        <template slot="event" slot-scope="{ item }">
          {{ $t(`objects.ccenter.queues.hooks.eventTypes.${item.event}`) }}
        </template>
        <template slot="schema" slot-scope="{ item }">
          {{ item.schema.name }}
        </template>
        <template slot="state" slot-scope="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            :disabled="!hasEditAccess"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          ></wt-switcher>
        </template>
        <template slot="actions" slot-scope="{ item, index }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="remove(index)"
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