<template>
  <wt-page-wrapper :actions-panel="false" class="gateways">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <create-chat-gateway-popup
        v-if="isChatGatewayPopup"
        @close="isGatewayPopup = false"
      ></create-chat-gateway-popup>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.routing.chatGateways.allChatGateways') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="actionPanelDeleteTooltip"
              @click="callDelete(selectedRows)"
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
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>

            <template slot="url" slot-scope="{ item }">
              {{ item.uri }}
            </template>

            <template slot="flow" slot-scope="{ item }">
              {{ item.flow.name }}

            </template>

            <template slot="provider" slot-scope="{ item }">
              <wt-icon icon-prefix="messenger" :icon="iconType(item)" sm></wt-icon>
            </template>

            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.enabled"
                :disabled="!hasEditAccess"
                @change="patchItem({ item, index, prop: 'enabled', value: $event })"
              ></wt-switcher>
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
import tableComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import CreateChatGatewayPopup from './create-chat-gateway-popup';

export default {
  components: { CreateChatGatewayPopup },
  mixins: [tableComponentMixin],

  name: 'the-chat-gateways',
  data: () => ({
    namespace: 'routing/chatGateways',
    isChatGatewayPopup: false,
  }),
  computed: {
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.chatGateways.chatGateways', 2), route: '/routing/chat-gateways' },
      ];
    },
  },

  methods: {
    iconType(item) {
      if (item.provider === 'infobip_whatsapp') return 'whatsapp';
      if (item.provider === 'webchat') return 'web-chat';
      return item.provider;
    },
    create() {
      this.isChatGatewayPopup = true;
    },
  },
};
</script>

<style scoped>


</style>
