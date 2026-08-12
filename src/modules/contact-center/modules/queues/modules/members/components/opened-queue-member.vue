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
        <template #primary-action>
          <wt-button-select
            :color="disabledSave ? 'secondary' : 'primary'"
            :options="saveOptions"
            @click="save"
            @click:option="({ callback }) => callback()"
          >
            {{ t('objects.save') }}
          </wt-button-select>
        </template>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <form
        class="main-container"
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

<script lang="ts" setup>
import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useCardTabs, useClose } from '@webitel/ui-sdk/composables';
import { computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum.js';
import QueuesRoutesName from '../../../router/_internals/QueuesRoutesName.enum';
import { useParentQueue } from '../composables/useParentQueue';
import { useQueueMembersCardStore } from '../stores';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { hasUpdateAccess } = useUserAccessControl();
const hasSaveActionAccess = hasUpdateAccess;

const { parentQueue, queueId } = useParentQueue();

const cardStore = useQueueMembersCardStore();

/**
 * `useNestedCardComponent`, not `useCardComponent`: every members request needs
 * the queue id, and only the nested composable threads a `parentId` through.
 */
const {
	modelValue,
	originalItemInstance,
	isNew,
	saveText,
	hasValidationErrors,
	isAnyFieldEdited,
	validationFields,
	save,
} = useNestedCardComponent<EngineMemberInQueue>({
	useCardStore: useQueueMembersCardStore,
	routeParamName: 'id',
	parentId: queueId.value,
});

/**
 * The nested composable resets when its route param clears, which never happens
 * while a card page is open — without this the next member opened would start
 * on the previous one's draft.
 */
onUnmounted(() => cardStore.$reset());

const tabs = computed(() => [
	{
		text: t('objects.general'),
		value: 'general',
		pathName: QueuesRoutesName.MEMBERS_GENERAL,
	},
	{
		text: t('objects.lookups.communications.communications', 1),
		value: 'communication',
		pathName: QueuesRoutesName.MEMBERS_COMMUNICATION_TYPE,
	},
	{
		text: t('objects.ccenter.queues.variables', 2),
		value: 'variables',
		pathName: QueuesRoutesName.MEMBERS_VARIABLES,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(RouteNames.MEMBERS);

const path = computed(() => {
	const baseUrl = `/contact-center/queues/${parentQueue.value?.id}/members`;
	return [
		{
			name: t('objects.ccenter.ccenter'),
		},
		{
			name: t('objects.ccenter.members.members', 2),
			route: baseUrl,
		},
		{
			name: isNew.value
				? t('objects.new')
				: (originalItemInstance.value?.name ?? ''),
			route: {
				name: currentTab.value?.pathName,
				query: route.query,
			},
		},
	];
});

const disabledSave = computed(
	() =>
		!hasSaveActionAccess.value ||
		!isAnyFieldEdited.value ||
		hasValidationErrors.value,
);

const saveOptions = computed(() => [
	{
		text: t('reusable.saveAs'),
		callback: saveAs,
	},
]);

/**
 * Copies the member into a new one, dropping the fields that describe how the
 * original was already processed.
 *
 * The url has to be replaced by hand: the card's routing watcher stops after
 * the first id it sees, so a second create would leave the page on the
 * original member's url.
 */
async function saveAs() {
	cardStore.itemId = null;
	Object.assign(modelValue.value, {
		id: undefined,
		stopCause: undefined,
		attempts: 0,
	});
	await save();
	await router.replace({
		params: {
			...route.params,
			id: String(cardStore.itemId),
		},
		query: route.query,
	});
}
</script>

<style scoped></style>
