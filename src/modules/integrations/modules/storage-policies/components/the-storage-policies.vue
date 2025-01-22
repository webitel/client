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
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $tc('objects.integrations.storagePolicies.storagePolicies', 2) }}
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
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          {{ dataList[1] }}
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>

            <template #channels="{ item }">
              {{ item.channels[0]}}

              <wt-tooltip
                v-if="item.channels.length > 1"
                :triggers="['click']"
              >
                <template #activator>
                  <wt-chip>
                    +{{ item.channels.length - 1 }}
                  </wt-chip>
                </template>

                <p
                  v-for="(channel) of item.channels.slice(1)"
                  :key="channel"
                > {{ channel }} </p>
              </wt-tooltip>
            </template>

            <template #mimeTypes="{ item }">
              <wt-chip color="secondary">
                +{{ item.mimeTypes[0] }}
              </wt-chip>

              <wt-tooltip
                v-if="item.mimeTypes.length > 1"
                :triggers="['click']"
              >
                <template #activator>
                  <wt-chip>
                    +{{ item.mimeTypes.length - 1 }}
                  </wt-chip>
                </template>

                <p
                  v-for="(channel) of item.mimeTypes.slice(1)"
                  :key="channel"
                > {{ channel }} </p>
              </wt-tooltip>
            </template>

            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="patchItem({ item, index, prop: 'enabled', value: $event })"
              />
            </template>

            <template #actions="{ item }">
              <wt-tooltip class="table-action">
                <template #activator>
                  <wt-icon-btn
                    v-if="hasEditAccess"
                    icon="move"
                  />
                </template>
                {{ $t('iconHints.draggable') }}
              </wt-tooltip>
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
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
import { mapActions } from 'vuex';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'TheStoragePolicies',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],
  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },
  data: () => ({
    namespace: 'integrations/storagePolicies',
    routeName: RouteNames.STORAGE_POLICIES,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$tc('objects.integrations.storagePolicies.storagePolicies', 2),
          route: `/integrations/${RouteNames.STORAGE_POLICIES}`,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      patchProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
  }
};

</script>

<style scoped>

</style>
