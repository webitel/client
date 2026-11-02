<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :secondary-action="close"
        hide-primary
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <div class="opened-card-form">
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            v-bind="tabProps"
          />
        </router-view>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { ObjectClassesAPI } from '@webitel/api-services/api';
import { type CardTab, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ObjectsRouteNames from '../router/_internals/ObjectsRouteNames.enum';
import { useObjectsObacStore } from '../stores/obac/objectsObacStore';

const { t } = useI18n();
const route = useRoute();

const { hasReadAccess, hasUpdateAccess } = useUserAccessControl();

const itemId = computed(() => route.params.id as string);

/** [Claude] an object class is not edited here, it is read only for its name in the breadcrumbs */
const className = ref('');

watch(
	itemId,
	async (id) => {
		if (!id) return;
		const { class: name } = await ObjectClassesAPI.get({
			itemId: id,
		});
		className.value = name;
	},
	{
		immediate: true,
	},
);

const tabs = computed<CardTab[]>(() => [
	{
		text: t('objects.permissions.object.ObAC'),
		value: 'obac',
		pathName: ObjectsRouteNames.OBAC,
	},
	{
		text: t('objects.permissions.object.RbAC'),
		value: 'rbac',
		pathName: ObjectsRouteNames.RBAC,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);

/** [Claude] adding a role and changing its rights are both a "patch" of the object class acl */
const access = computed(() => ({
	read: hasReadAccess.value,
	create: hasUpdateAccess.value,
	update: hasUpdateAccess.value,
	delete: hasUpdateAccess.value,
}));

/** [Claude] OBAC is the shared permissions tab, which takes its store; RBAC has its own */
const tabProps = computed(() => ({
	parentId: itemId.value,
	access: access.value,
	...(currentTab.value?.value === 'obac' && {
		store: useObjectsObacStore,
	}),
}));

const { close } = useClose(RouteNames.OBJECTS);

const path = computed(() => [
	{
		name: t('objects.permissions.permissions'),
	},
	{
		name: t('objects.permissions.object.object'),
		route: '/permissions/objects',
	},
	{
		name: className.value,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);
</script>
