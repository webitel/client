<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
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
      <create-chat-gateway-popup
        :shown="isChatGatewayPopup"
        size="sm"
        @close="isChatGatewayPopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.routing.chatGateways.allChatGateways') }}
          </h3>
          <div class="table-title__actions-wrap">
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
                :class="{ 'hidden': anySelected }"
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
          class="table-section__table-wrapper"
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

            <template #uri="{ item }">
              {{ item.uri }}
            </template>

            <template #flow="{ item }">
              <adm-item-link
                v-if="item.flow"
                :id="item.flow.id"
                :route-name="RouteNames.FLOW"
                target="_blank"
              >
                {{ item.flow.name }}
              </adm-item-link>
            </template>

            <template #provider="{ item }">
              <wt-icon
                v-if="iconType[item.provider] && !Array.isArray(providerIcon(item.provider))"
                :icon="iconType[item.provider]"
              />
              <div
                v-else-if="iconType[item.provider] && Array.isArray(providerIcon(item.provider))"
                class="provider-icons-wrapper"
              >
                <wt-icon
                  v-for="(icon, key) of providerIcon(item.provider)"
                  :key="key"
                  :icon="icon"
                  size="md"
                />
              </div>
              <p v-else>
                {{ item.provider }}
              </p>
            </template>

            <template #enabled="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.enabled"
                @update:model-value="patchItem({ item, index, prop: 'enabled', value: $event })"
              />
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasUpdateAccess"
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
import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import CreateChatGatewayPopup from './create-chat-gateway-popup.vue';

const iconType = {
  [ChatGatewayProvider.MESSENGER]: 'meta',
  [ChatGatewayProvider.INFOBIP]: 'messenger-infobip',
  [ChatGatewayProvider.VIBER]: 'messenger-viber',
  [ChatGatewayProvider.WEBCHAT]: 'messenger-web-chat',
  [ChatGatewayProvider.TELEGRAM_BOT]: 'telegram-bot',
  [ChatGatewayProvider.TELEGRAM_APP]: 'messenger-telegram',
  [ChatGatewayProvider.CUSTOM]: 'custom-chat-gateway',
};

const namespace = 'routing/chatGateways';

export default {
  name: 'TheChatGateways',
  components: {
    CreateChatGatewayPopup,
    DeleteConfirmationPopup,
  },
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

    const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } = useUserAccessControl();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,
    };
  },
  data: () => ({
    namespace,
    isChatGatewayPopup: false,
    iconType,
    routeName: RouteNames.CHAT_GATEWAYS,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.routing.routing'),
        },
        {
          name: this.$t('objects.routing.chatGateways.chatGateways', 2),
          route: '/routing/chat-gateways',
        },
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
          return [
            iconType[value],
            'send-arrow',
            'messenger-facebook',
            'instagram',
            'messenger-whatsapp',
          ];
        default:
          return iconType[value];
      }
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.table-wrapper {
  .provider-icons-wrapper {
    display: flex;
  }
}
</style>
