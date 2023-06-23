<template>
  <wt-page-wrapper :actions-panel="false" class="gateways">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
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
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="$t(dummy.text)"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template v-slot:proxy="{ item }">
              {{ item.proxy }}
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :value="item.enable"
                :disabled="!hasEditAccess"
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
import { useDummy } from '../../../../../app/composables/useDummy';

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
    const { dummy } = useDummy({ namespace });
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
