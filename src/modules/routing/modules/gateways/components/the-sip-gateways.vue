<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="gateways"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <gateway-popup
        :shown="isGatewayPopup"
        @close="isGatewayPopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.routing.gateways.allGateways') }}
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
            <template #proxy="{ item }">
              {{ item.proxy }}
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :model-value="item.enable"
                @update:model-value="patchItem({ item, index, prop: 'enable', value: $event })"
              />
            </template>
            <template #status="{ item }">
              <wt-indicator
                :color="computeStatusClass(item.rState)"
                :text="computeStatusText(item.rState)"
              />
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
import GatewayPopup from './create-gateway-popup.vue';

const namespace = 'routing/gateways';

export default {
  name: 'TheSipGateways',
  components: { GatewayPopup, DeleteConfirmationPopup },
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
    isGatewayPopup: false,
    routeName: RouteNames.GATEWAYS,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.routing.routing'),
        },
        {
          name: this.$tc('objects.routing.gateways.gateways', 2),
          route: '/routing/sip-gateways',
        },
      ];
    },
  },

  methods: {
    create() {
      this.isGatewayPopup = true;
    },

    computeStatusText(stateCode) {
      if (stateCode === 3) return this.$t('objects.routing.gateways.stateSuccess');
      if (stateCode > 3 && stateCode < 8) return this.$t('objects.routing.gateways.stateFailed');
      if (stateCode > 7 && stateCode < 2) return this.$t('objects.routing.gateways.stateProgress');
      return this.$t('objects.routing.gateways.stateNonreg');
    },

    computeStatusClass(stateCode) {
      if (stateCode === 3) return 'success';
      if (stateCode > 3 && stateCode < 8) return 'error';
      if (stateCode > 7 && stateCode < 2) return 'primary';
      return 'disabled';
    },
  },
};
</script>
