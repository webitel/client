<template>
  <wt-page-wrapper
    v-if="showQueuePage"
    :actions-panel="isLogsTab"
  >
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

    <!-- the logs tab still keeps its filters in the page's panel; it moves
         inside the tab when that tab is migrated -->
    <template #actions-panel>
      <logs-filters :namespace="`${LEGACY_QUEUES_VUEX_NAMESPACE}/log/filters`" />
    </template>

    <template #main>
      <form
        class="tabs-page-wrapper"
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
            v-bind="permissionsStoreData"
          />
        </router-view>
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
  <wt-loader v-else />
</template>

<script lang="ts" setup>
import {
	getQueueDefaults,
	hasQueueTypeDefaults,
} from '@webitel/api-services/api';
import { useCardComponent } from '@webitel/ui-datalist/card';
import { useCardTabs, useClose } from '@webitel/ui-sdk/composables';
import { WtObject } from '@webitel/ui-sdk/enums';
import deepmerge from 'deepmerge';
import { computed, onMounted, onUnmounted, ref, toRaw, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import { provideEnsureQueueSaved } from '../composables/useEnsureQueueSaved';
import {
	LEGACY_QUEUES_VUEX_NAMESPACE,
	useLegacyQueueVuexBridge,
} from '../composables/useLegacyQueueVuexBridge';
import {
	type QueueTab,
	QueueTabId,
	QueueTypeSpecificTabs,
} from '../configs/queueTabs';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import LogsFilters from '../modules/logs/modules/filters/components/the-queue-logs-filters.vue';
import QueuesRoutesName from '../router/_internals/QueuesRoutesName.enum';
import { useQueuesCardStore, useQueuesPermissionsStore } from '../stores';
import type { Queue } from '../types/Queue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const {
	hasSaveActionAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasReadAccess,
	hasDeleteAccess,
} = useUserAccessControl();
const { hasReadAccess: hasAgentsReadAccess } = useUserAccessControl(
	WtObject.Agent,
);
const { hasReadAccess: hasLogsReadAccess } = useUserAccessControl(
	WtObject.ChangeLog,
);

const cardStore = useQueuesCardStore();

/**
 * `manualSetup` because a new queue's shape depends on `?type=`, which
 * `createCardStore` knows nothing about. Owning `initialize` here lets the
 * type defaults be merged in before anything reads the draft. The cost is
 * re-implementing three small things the composable would otherwise do:
 * `initialize`, `$reset` on unmount, and the "replace `new` in the url once the
 * server assigns an id" watcher — `useCardRouting` is not exported.
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
} = useCardComponent<Queue>({
	useCardStore: useQueuesCardStore,
	manualSetup: true,
});

const { bridgeToLegacyVuex } = useLegacyQueueVuexBridge();

const isInitialized = ref(false);

const routeQueueType = computed(() =>
	route.query.type != null ? Number(route.query.type) : undefined,
);

const queueType = computed<number | undefined>(
	() =>
		(modelValue.value?.type as number | undefined) ??
		(originalItemInstance.value?.type as number | undefined) ??
		routeQueueType.value,
);

/** legacy guard: the page rendered only once `itemInstance.type` was known */
const showQueuePage = computed(
	() =>
		isInitialized.value &&
		queueType.value != null &&
		hasQueueTypeDefaults(queueType.value),
);

const isLogsTab = computed(() => route.name === QueuesRoutesName.LOGS);

const tabDescriptors = computed<Record<QueueTabId, QueueTab>>(() => ({
	[QueueTabId.General]: {
		text: t('objects.general'),
		value: QueueTabId.General,
		pathName: QueuesRoutesName.GENERAL,
	},
	[QueueTabId.Params]: {
		text: t('objects.ccenter.queues.params'),
		value: QueueTabId.Params,
		pathName: QueuesRoutesName.PARAMETERS,
	},
	[QueueTabId.Processing]: {
		text: t('objects.ccenter.queues.processing.processing'),
		value: QueueTabId.Processing,
		pathName: QueuesRoutesName.PROCESSING,
	},
	[QueueTabId.Agents]: {
		text: t('objects.ccenter.agents.agents', 2),
		value: QueueTabId.Agents,
		pathName: QueuesRoutesName.AGENTS,
		disabled: !hasAgentsReadAccess.value,
	},
	[QueueTabId.Skills]: {
		text: t('objects.lookups.skills.skills', 2),
		value: QueueTabId.Skills,
		pathName: QueuesRoutesName.SKILLS,
	},
	[QueueTabId.Resources]: {
		text: t('objects.ccenter.res.res', 2),
		value: QueueTabId.Resources,
		pathName: QueuesRoutesName.RESOURCES,
	},
	[QueueTabId.Buckets]: {
		text: t('objects.lookups.buckets.buckets', 2),
		value: QueueTabId.Buckets,
		pathName: QueuesRoutesName.BUCKETS,
	},
	[QueueTabId.Hooks]: {
		text: t('objects.ccenter.queues.hooks.hooks', 2),
		value: QueueTabId.Hooks,
		pathName: QueuesRoutesName.HOOKS,
	},
	[QueueTabId.Amd]: {
		text: t('objects.ccenter.queues.amd'),
		value: QueueTabId.Amd,
		pathName: QueuesRoutesName.AMD,
	},
	[QueueTabId.Variables]: {
		text: t('objects.ccenter.queues.variables', 2),
		value: QueueTabId.Variables,
		pathName: QueuesRoutesName.VARIABLES,
	},
	[QueueTabId.Permissions]: {
		text: t('objects.permissions.permissions', 2),
		value: QueueTabId.Permissions,
		pathName: QueuesRoutesName.PERMISSIONS,
	},
	[QueueTabId.Logs]: {
		text: t('objects.ccenter.queues.logs.logs', 2),
		value: QueueTabId.Logs,
		pathName: QueuesRoutesName.LOGS,
		disabled: !hasLogsReadAccess.value,
	},
}));

const tabs = computed(() => {
	const descriptors = tabDescriptors.value;
	const specific = (
		queueType.value != null
			? (QueueTypeSpecificTabs[queueType.value] ?? [])
			: []
	)
		.map((id) => descriptors[id])
		// legacy semantics: a tab the user cannot read is hidden, not disabled
		.filter((tab) => !tab.disabled);

	const list = [
		descriptors[QueueTabId.General],
		descriptors[QueueTabId.Params],
		...specific,
		descriptors[QueueTabId.Hooks],
		descriptors[QueueTabId.Variables],
	];

	if (!isNew.value) {
		list.push(descriptors[QueueTabId.Permissions]);
		if (!descriptors[QueueTabId.Logs].disabled) {
			list.push(descriptors[QueueTabId.Logs]);
		}
	}

	return list;
});

const { currentTab } = useCardTabs(tabs);

/**
 * `useCardTabs`' own `changeTab` drops the route query, which would lose
 * `?type=` on the first tab switch of a queue that has not been saved yet.
 */
const changeTab = (tab: { pathName: string }) =>
	router.push({
		name: tab.pathName,
		params: route.params,
		query: route.query,
		hash: route.hash,
	});

const { close } = useClose(RouteNames.QUEUES);

const permissionsStoreData = computed(() => ({
	store: useQueuesPermissionsStore,
	access: {
		create: hasCreateAccess.value,
		read: hasReadAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: route.params.id,
}));

const path = computed(() => {
	const properties =
		queueType.value != null ? QueueTypeProperties[queueType.value] : undefined;
	const title = properties ? t(properties.locale) : '';
	const name = isNew.value
		? t('objects.new')
		: (originalItemInstance.value?.name ?? '');

	return [
		{
			name: t('objects.ccenter.ccenter'),
		},
		{
			name: t('objects.ccenter.queues.queues', 2),
			route: '/contact-center/queues',
		},
		{
			name: `${name} (${title})`,
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

/**
 * Nested tabs can add their first record before the queue exists. Routed
 * through the card's own validated `save`, so an invalid queue blocks the add
 * and shows its errors rather than persisting half-filled.
 */
provideEnsureQueueSaved(async () => {
	if (!isNew.value) return cardStore.itemId;
	await save();
	return cardStore.itemId;
});

onMounted(async () => {
	await cardStore.initialize({
		itemId: route.params.id as string,
	});

	if (!cardStore.itemId) {
		// deepmerge rather than assign: zod defaults that did land must survive,
		// and so must anything already typed if the card is re-entered
		cardStore.draftItemInstance = deepmerge(
			getQueueDefaults(routeQueueType.value),
			toRaw(cardStore.draftItemInstance) ?? {},
		);
	}

	// must run before the router-view renders: a legacy tab that mounts first
	// would read itemId 0 from vuex and load the wrong list
	bridgeToLegacyVuex();
	isInitialized.value = true;
});

onUnmounted(() => cardStore.$reset());

/** `useCardRouting` parity, plus the query preservation it does not do */
const stopIdWatch = watch(
	() => cardStore.itemId,
	async (next, prev) => {
		if (next && !prev) {
			await router.replace({
				params: {
					...route.params,
					id: String(next),
				},
				query: route.query,
			});
			stopIdWatch();
		}
	},
);
</script>

<style
  lang="scss"
  scoped
></style>
