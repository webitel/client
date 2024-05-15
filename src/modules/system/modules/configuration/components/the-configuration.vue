<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="() => isConfigurationPopup = true"
        hide-secondary
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <configuration-popup
        :id="id"
        :namespace="namespace"
        :shown="isConfigurationPopup"
        @close="isConfigurationPopup = false"
      />

      <delete-confirmation-popup
        :callback="deleteCallback"
        :delete-count="deleteCount"
        :shown="isDeleteConfirmationPopup"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{
              $t('objects.all', {
                entity: $tc('objects.system.configuration.configuration', 2).toLowerCase(),
              })
            }}
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
          :dark-mode="darkMode"
          class="dummy-wrapper"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              {{ item.name }}
            </template>
            <template #value="{ item }">
              {{ item.value }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="editParameter(item)"
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
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import ConfigurationPopup from './configuration-popup.vue';

const namespace = 'system/configuration';

export default {
  name: 'TheConfiguration',
  components: { ConfigurationPopup, DeleteConfirmationPopup },
  mixins: [tableComponentMixin],
  setup() {
    const { dummy } = useDummy({ namespace });
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
    isConfigurationPopup: false,
  }),
  computed: {
    ...mapState({
      id(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
    }),
    path() {
      return [
        { name: this.$t('objects.system.system') },
        { name: this.$tc('objects.system.configuration.configuration', 1), route: 'configuration' },
      ];
    },
  },
  methods: {
    ...mapActions({
      setItemId(dispatch, payload) {
        return dispatch(`${namespace}/SET_ITEM_ID`, payload);
      },
    }),
    editParameter(item) {
      this.setItemId(item.id);
      this.isConfigurationPopup = true;
    },
  },
};
</script>
