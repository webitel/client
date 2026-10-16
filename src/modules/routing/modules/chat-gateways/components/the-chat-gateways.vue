<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="() => (isCreatePopup = true)"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <create-chat-gateway-popup
        :shown="isCreatePopup"
        @close="isCreatePopup = false"
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
            {{ t('objects.routing.chatGateways.allChatGateways') }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH, IconAction.DELETE]"
            :disabled:delete="!hasDeleteAccess || !selected.length"
            @click:refresh="loadDataList"
            @click:delete="
              askDeleteConfirmation({
                deleted: selected,
                callback: () => deleteEls(selected),
              })
            "
          >
            <template #search-bar>
              <dynamic-filter-search
                :filters-manager="filtersManager"
                single-search-name="search"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
          </wt-action-bar>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
            :primary-action-text="primaryActionTextEmpty"
            :disabled-primary-action="!hasCreateAccess"
            @click:primary="isCreatePopup = true"
          />

          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="dataList.length && !isLoading"
            :data="dataList"
            :selected="selected"
            :headers="shownHeaders"
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.CHAT_GATEWAYS"
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
              <div
                v-if="providerIcons[item.provider]"
                class="the-chat-gateways__provider-icons"
              >
                <wt-icon
                  v-for="icon of providerIcons[item.provider]"
                  :key="icon"
                  :icon="icon"
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
                @update:model-value="
                  patchItemProperty({ index, path: 'enabled', value: $event })
                "
              />
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                :action="IconAction.EDIT"
                @click="edit(item)"
              />
              <wt-icon-action
                :disabled="!hasDeleteAccess"
                :action="IconAction.DELETE"
                @click="
                  askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteEls([item]),
                  })
                "
              />
            </template>
          </wt-table>
          <wt-pagination
            :next="next"
            :prev="page > 1"
            :size="size"
            debounce
            @change="updateSize"
            @next="updatePage(page + 1)"
            @prev="updatePage(page - 1)"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useChatGatewayDatalistStore } from '../stores/datalist/chatGatewayDatalistStore';
import CreateChatGatewayPopup from './create-chat-gateway-popup.vue';

/** [Claude] the provider's icon, followed by the channels it brings for the multichannel ones */
const providerIcons: Record<string, string[]> = {
	[ChatGatewayProvider.MESSENGER]: [
		'meta',
		'send-arrow',
		'messenger-facebook',
		'instagram',
		'messenger-whatsapp',
	],
	[ChatGatewayProvider.INFOBIP]: [
		'messenger-infobip',
		'send-arrow',
		'messenger-whatsapp',
	],
	[ChatGatewayProvider.VIBER]: [
		'messenger-viber',
	],
	[ChatGatewayProvider.WEBCHAT]: [
		'messenger-web-chat',
	],
	[ChatGatewayProvider.TELEGRAM_BOT]: [
		'telegram-bot',
	],
	[ChatGatewayProvider.TELEGRAM_APP]: [
		'messenger-telegram',
	],
	[ChatGatewayProvider.CUSTOM]: [
		'custom-chat-gateway',
	],
};

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const chatGatewayDatalistStore = useChatGatewayDatalistStore();

const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	shownHeaders,
	filtersManager,
} = storeToRefs(chatGatewayDatalistStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSelected,
	patchItemProperty,
	columnResize,
	columnReorder,
} = chatGatewayDatalistStore;

initialize();

const { t } = useI18n();
const router = useRouter();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const isCreatePopup = ref(false);

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.chatGateways.chatGateways', 2),
		route: '/routing/chat-gateways',
	},
]);

const edit = (item: ChatGatewayCard) =>
	router.push({
		name: `${RouteNames.CHAT_GATEWAYS}-card`,
		params: {
			id: item.id,
		},
	});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style scoped>
.the-chat-gateways__provider-icons {
  display: flex;
}
</style>
