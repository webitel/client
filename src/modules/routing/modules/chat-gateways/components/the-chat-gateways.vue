<template>
  <wt-page-wrapper :actions-panel="false" class="chat-gateways">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
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

            <template slot="uri" slot-scope="{ item }">
              {{ item.uri }}
            </template>

            <template slot="flow" slot-scope="{ item }">
              <item-link
                v-if="item.flow"
                :route-name="RouteNames.FLOW"
                :id="item.flow.id"
              >
                {{ item.flow.name }}
              </item-link>
            </template>

            <template slot="provider" slot-scope="{ item }">
              <wt-icon v-if="iconType[item.provider] && !Array.isArray(providerIcon(item.provider))"
                       :icon="iconType[item.provider]"
              />
              <div v-else-if="iconType[item.provider] && Array.isArray(providerIcon(item.provider))">
                <wt-icon
                  v-for="(icon, key) of providerIcon(item.provider)"
                  :icon="icon"
                  :key="key"
                  size="md"
                ></wt-icon>
              </div>
              <p v-else> {{ item.provider }} </p>
            </template>

            <template slot="enabled" slot-scope="{ item, index }">
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
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';
import CreateChatGatewayPopup from './create-chat-gateway-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const iconType = {
  [ChatGatewayProvider.MESSENGER]: 'meta',
  [ChatGatewayProvider.INFOBIP]: 'messenger-infobip',
  [ChatGatewayProvider.VIBER]: 'messenger-viber',
  [ChatGatewayProvider.WEBCHAT]: 'messenger-web-chat',
  [ChatGatewayProvider.TELEGRAM_BOT]: 'telegram-bot',
  [ChatGatewayProvider.TELEGRAM_APP]: 'messenger-telegram',
};

export default {
  name: 'the-chat-gateways',
  mixins: [tableComponentMixin],
  components: { CreateChatGatewayPopup },
  data: () => ({
    namespace: 'routing/chatGateways',
    isChatGatewayPopup: false,
    iconType,
    routeName: RouteNames.CHAT_GATEWAYS,
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
    providerIcon(value) {
      switch (value) {
        case ChatGatewayProvider.INFOBIP:
          return [iconType[value], 'send-arrow', 'messenger-whatsapp'];
        case ChatGatewayProvider.MESSENGER:
          return [iconType[value], 'send-arrow', 'messenger-facebook', 'instagram', 'messenger-whatsapp'];
        default: return iconType[value];
      }
    }
  },
};
</script>
