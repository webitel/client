<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!isCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.ccenter.res.allRes') }}</h3>
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
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>
            <template slot="gateway" slot-scope="{ item }">
              <div v-if="item.gateway">
                {{ item.gateway.name }}
              </div>
            </template>
            <template slot="enabled" slot-scope="{ item, index }">
              <wt-switcher
                class="test__resources__enable-switcher"
                :value="item.enabled"
                @change="patchProperty({ index, prop: 'enabled', value: $event })"
              ></wt-switcher>
            </template>
            <template slot="reserve" slot-scope="{ item, index }">
              <wt-switcher
                class="test__resources__reserve-switcher"
                :value="item.reserve"
                @change="patchProperty({ index, prop: 'reserve', value: $event })"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <edit-action
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
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-resources',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'ccenter/res',
    routeName: RouteNames.RESOURCES,
  }),

  computed: {
    ...mapState('ccenter/res', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),

    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'gateway', text: this.$tc('objects.routing.gateways.gateways', 1) },
        { value: 'enabled', text: this.$t('objects.enabled'), width: '100px' },
        { value: 'reserve', text: this.$t('objects.ccenter.res.reserve'), width: '100px' },
      ];
    },

    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.res.res', 2), route: '/contact-center/resources' },
      ];
    },
  },

  methods: {
    ...mapActions('ccenter/res', {
      patchProperty: 'PATCH_ITEM_PROPERTY',
    }),
  },
};
</script>
