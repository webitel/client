<template>
  <wt-page-wrapper :actions-panel="false" class="gateways">
    <template slot="header">
      <object-header
        :hide-primary="!isCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <gateway-popup
        v-if="isGatewayPopup"
        @close="isGatewayPopup = false"
      ></gateway-popup>

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
            <wt-icon-btn
              v-if="isDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
            ></wt-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>
            <template slot="proxy" slot-scope="{ item }">
              {{ item.proxy }}
            </template>
            <template slot="enabled" slot-scope="{ item }">
              <wt-switcher
                :value="item.enable"
                :disabled="!isEditAccess"
                @change="changeState({ item, value: $event })"
              ></wt-switcher>
            </template>
            <template slot="status" slot-scope="{ item }">
              <status
                class="status"
                :class="computeStatusClass(item.rState)"
                :text="computeStatusText(item.rState)"
              ></status>
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <edit-action
                v-if="isEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="isDeleteAccess"
                @click="remove(index)"
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
import { mapActions, mapState } from 'vuex';
import GatewayPopup from './create-gateway-popup.vue';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-sip-gateways',
  mixins: [tableComponentMixin],
  components: { GatewayPopup },

  data: () => ({
    isGatewayPopup: false,
    namespace: 'routing/gateways',
  }),

  computed: {
    ...mapState('routing/gateways', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),

    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'proxy', text: this.$t('objects.routing.gateways.proxy') },
        { value: 'enabled', text: this.$t('objects.enabled'), width: '60px' },
        { value: 'status', text: this.$t('objects.status') },
      ];
    },
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.gateways.gateways', 2), route: '/routing/gateways' },
      ];
    },
  },

  methods: {
    ...mapActions('routing/gateways', {
      changeState: 'CHANGE_STATE',
    }),

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
      if (stateCode === 3) {
        return this.$t('objects.routing.gateways.stateSuccess');
      }
      if (stateCode > 3 && stateCode < 8) {
        return this.$t('objects.routing.gateways.stateFailed');
      }
      if (stateCode > 7 && stateCode < 2) {
        return this.$t('objects.routing.gateways.stateProgress');
      }
      return this.$t('objects.routing.gateways.stateNonreg');
    },

    computeStatusClass(stateCode) {
      if (stateCode === 3) {
        return 'status__true';
      }
      if (stateCode > 3 && stateCode < 8) {
        return 'status__false';
      }
      if (stateCode > 7 && stateCode < 2) {
        return 'status__info';
      }
      return 'not-registered';
    },
  },
};
</script>
