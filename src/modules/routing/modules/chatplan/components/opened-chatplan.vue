<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <wt-loader v-if="debouncedIsLoading" />
      <form
        v-else
        class="opened-card-form"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
          />
        </router-view>
        <input
          hidden
          type="submit"
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import type { ChatplanCard } from '@webitel/api-services/validations';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ChatplanRouteNames from '../router/_internals/ChatplanRouteNames.enum';
import { useChatplanCardStore } from '../stores';

const { t } = useI18n();
const { hasSaveActionAccess } = useUserAccessControl();

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<ChatplanCard>({
	useCardStore: useChatplanCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => [
	{
		text: t('objects.general'),
		value: 'general',
		pathName: ChatplanRouteNames.GENERAL,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.CHATPLAN);

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.chatplan.chatplan', 2),
		route: '/routing/chatplan',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
	},
]);
</script>
