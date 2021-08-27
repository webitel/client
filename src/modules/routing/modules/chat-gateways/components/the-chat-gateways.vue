<template>
  <wt-page-wrapper :actions-panel="false" class="chat-gateways">
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
        @close="isChatGatewayPopup = false"
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
              <div v-if="item.flow">
                {{ item.flow.name }}
              </div>
            </template>

            <template slot="provider" slot-scope="{ item }">
              <wt-icon v-if="iconType[item.provider]" icon-prefix="messenger" :icon="iconType[item.provider]" sm />
              <p v-else> {{item.provider}} </p>
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
import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import tableComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import getMessengerType from '../store/_internals/scripts/getMessengerTypeByEnum';
import CreateChatGatewayPopup from './create-chat-gateway-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const iconType = {
  [MessengerType.FACEBOOK]: 'facebook',
  [MessengerType.WHATSAPP]: 'whatsapp',
  [MessengerType.VIBER]: 'viber',
  [MessengerType.WEB_CHAT]: 'web-chat',
  [MessengerType.TELEGRAM]: 'telegram',
};

export default {
  name: 'the-chat-gateways',
  components: { CreateChatGatewayPopup },
  mixins: [tableComponentMixin],
  data: () => ({
    iconType,
    namespace: 'routing/chatGateways',
    isChatGatewayPopup: false,
    iconType,
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
    create() {
      this.isChatGatewayPopup = true;
    },
    edit(item) {
      const type = getMessengerType(item.provider);
      this.$router.push({
        name: `${RouteNames.CHAT_GATEWAYS}-${type}-edit`,
        params: { id: item.id },
      });
    },
  },
};
</script>
