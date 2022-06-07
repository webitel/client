<template>
  <wt-page-wrapper :actions-panel="false" class="gateways">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
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
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
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
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="proxy" slot-scope="{ item }">
              {{ item.proxy }}
            </template>
            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.enable"
                :disabled="!hasEditAccess"
                @change="patchItem({ item, index, prop: 'enable', value: $event })"
              ></wt-switcher>
            </template>
            <template slot="status" slot-scope="{ item }">
              <wt-indicator
                :color="computeStatusClass(item.rState)"
                :text="computeStatusText(item.rState)"
              ></wt-indicator>
            </template>
            <template slot="actions" slot-scope="{ item }">
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="callDelete(item)"
              ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import GatewayPopup from './create-gateway-popup.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-sip-gateways',
  mixins: [tableComponentMixin],
  components: { GatewayPopup },

  data: () => ({
    namespace: 'routing/gateways',
    isGatewayPopup: false,
  }),

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

    edit(item) {
      const name = item.register
        ? `${RouteNames.GATEWAYS}-reg-edit` : `${RouteNames.GATEWAYS}-trunk-edit`;

      this.$router.push({
        name,
        params: { id: item.id },
      });
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
