<template>
  <wt-page-wrapper :actions-panel="false" class="gateways">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <gateway-popup
        v-if="isGatewayPopup"
        @close="isGatewayPopup = false"
      ></gateway-popup>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.routing.gateways.allGateways') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            ></wt-search-bar>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        ></wt-dummy>
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
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:proxy="{ item }">
              {{ item.proxy }}
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enable"
                @change="patchItem({ item, index, prop: 'enable', value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:status="{ item }">
              <wt-indicator
                :color="computeStatusClass(item.rState)"
                :text="computeStatusText(item.rState)"
              ></wt-indicator>
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasDeleteAccess"
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
  </wt-page-wrapper>
</template>

<script>
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import GatewayPopup from './create-gateway-popup.vue';

const namespace = 'routing/gateways';

export default {
  name: 'the-sip-gateways',
  mixins: [tableComponentMixin],
  components: { GatewayPopup },

  data: () => ({
    namespace,
    isGatewayPopup: false,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    return { dummy };
  },

  computed: {
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.gateways.gateways', 2), route: '/routing/sip-gateways' },
      ];
    },
  },

  methods: {
    create() {
      this.isGatewayPopup = true;
    },

    editLink(item) {
      const name = item.register
        ? `${RouteNames.GATEWAYS}-reg-edit` : `${RouteNames.GATEWAYS}-trunk-edit`;

      return {
        name,
        params: { id: item.id },
      };
    },

    computeStatusText(stateCode) {
      if (stateCode === 3) return this.$t('objects.routing.gateways.stateSuccess');
      if (stateCode > 3 && stateCode < 8) return this.$t('objects.routing.gateways.stateFailed');
      if (stateCode > 7 && stateCode < 2) return this.$t('objects.routing.gateways.stateProgress');
      return this.$t('objects.routing.gateways.stateNonreg');
    },

    computeStatusClass(stateCode) {
      if (stateCode === 3) return 'success';
      if (stateCode > 3 && stateCode < 8) return 'danger';
      if (stateCode > 7 && stateCode < 2) return 'primary';
      return 'disabled';
    },
  },
};
</script>
