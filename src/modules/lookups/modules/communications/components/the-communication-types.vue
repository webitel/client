<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.lookups.communications.allCommunications') }}
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
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #channel="{ item }">
              <div
                v-if="item.channel"
              >
                {{ $t(`objects.lookups.communications.channels.${item.channel}`) }}
              </div>
            </template>
            <template #code="{ item }">
              {{ item.code }}
            </template>
            <template #default="{ item, index }">
              <wt-radio
                :selected="item.default"
                :value="true"
                @input="changeDefaultType({ item, index, value: $event })"
              />
            </template>
            <template #description="{ item }">
              {{ item.description }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasEditAccess"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
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
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'lookups/communications';

export default {
  name: 'TheCommunicationTypes',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    namespace,
    routeName: RouteNames.COMMUNICATIONS,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$tc('objects.lookups.communications.communications', 2),
          route: '/lookups/communications',
        },
      ];
    },
  },
  methods: {
    async changeDefaultType({ index, item, value }) {
      try {
        await this.patchItem({
          index,
          item,
          prop: 'default',
          value,
        });
        if (value) this.loadList();
      } catch {
        this.loadList();
      }
    },
  },
};
</script>

<style scoped>

</style>
