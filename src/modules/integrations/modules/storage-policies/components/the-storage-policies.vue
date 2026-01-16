<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header :hide-primary="!hasCreateAccess" :primary-action="create">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup v-show="isDeleteConfirmationPopup" :delete-count="deleteCount"
        :callback="deleteCallback" @close="closeDelete" />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.integrations.storagePolicies.storagePolicies', 2) }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
            <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
              <delete-all-action v-if="hasDeleteAccess" :class="{ hidden: anySelected }"
                :selected-count="selectedRows.length" @click="
                  askDeleteConfirmation({
                    deleted: selectedRows,
                    callback: () => deleteData(selectedRows),
                  })
                  " />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />

        <wt-dummy v-if="dummy && isLoaded" class="dummy-wrapper" :src="dummy.src" :text="dummy.text && $t(dummy.text)"
          :dark-mode="darkMode" :show-action="dummy.showAction" @create="create" />

        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table :data="dataList" :headers="headers" fixed-actions sortable :row-reorder="hasEditAccess" @sort="sort"
            @reorder:row="handleReorder">
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>

            <template #channels="{ item }">
              <wt-display-chip-items v-if="item?.channels.length" :items="item?.channels">
                <template #first-item>
                  <p>
                    {{
                      $t(
                        `objects.integrations.storagePolicies.channels.${item.channels[0]}`
                      )
                    }}
                  </p>
                </template>

                <template #items>
                  <p v-for="channel of item.channels.slice(1)" :key="channel">
                    {{
                      $t(
                        `objects.integrations.storagePolicies.channels.${channel}`,
                      )
                    }}
                  </p>
                </template>
              </wt-display-chip-items>
            </template>

            <template #mimeTypes="{ item }">
              <wt-display-chip-items v-if="item?.mimeTypes.length" :items="item?.mimeTypes">
                <template #first-item>
                  <wt-chip color="secondary"> {{ item.mimeTypes[0] }} </wt-chip>
                </template>

                <template #items>
                  <p v-for="channel of item.mimeTypes.slice(1)" :key="channel">
                    {{ channel }}
                  </p>
                </template>
              </wt-display-chip-items>
            </template>

            <template #state="{ item, index }">
              <wt-switcher :disabled="!hasEditAccess" :model-value="item.enabled" @update:model-value="
                patchItem({ item, index, prop: 'enabled', value: $event })
                " />
            </template>

            <template #actions="{ item }">
              <wt-icon-action action="edit" :disabled="!hasEditAccess" @click="edit(item)" />
              <wt-icon-action action="delete" :disabled="!hasDeleteAccess" @click="
                askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })
                " />
            </template>
          </wt-table>
          <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
            @next="nextPage" @prev="prevPage" />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { WtDisplayChipItems } from '@webitel/ui-sdk/components';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { mapActions } from 'vuex';

import { useDummy } from '../../../../../app/composables/useDummy.js';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'integrations/storagePolicies';

export default {
  name: 'TheStoragePolicies',
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
    routeName: RouteNames.STORAGE_POLICIES,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t(
            'objects.integrations.storagePolicies.storagePolicies',
            2,
          ),
          route: `/integrations/${RouteNames.STORAGE_POLICIES}`,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      swapRows(dispatch, payload) {
        return dispatch(`${this.namespace}/SWAP_ROWS`, payload);
      },
    }),
    create() {
      this.$router.push({
        name: `${RouteNames.STORAGE_POLICIES}-card`,
        params: { id: 'new' },
      });
    },
    editLink({ id }) {
      return { name: `${RouteNames.STORAGE_POLICIES}-card`, params: { id } };
    },
    async handleReorder({ oldIndex, newIndex }) {
      if (oldIndex === newIndex) return;
      const fromId = this.dataList[oldIndex].id;
      const toId = this.dataList[newIndex].id;
      await this.swapRowsAndReloadList({
        fromId,
        toId,
      });
    },
    async swapRowsAndReloadList(swapPayload) {
      await this.swapRows(swapPayload);
      await this.loadList();
    },
  },
};
</script>