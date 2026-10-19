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
</template>

<script setup lang="ts">
import { getCognitiveProfileDefaults } from '@webitel/api-services/api';
import type { StorageProviderType } from '@webitel/api-services/gen/models';
import type { CognitiveProfileCard } from '@webitel/api-services/validations';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import CognitiveProfilesRouteNames from '../router/_internals/CognitiveProfilesRouteNames.enum';
import { useCognitiveProfileCardStore } from '../stores/card/cognitiveProfileCardStore';
import { useCognitiveProfilesPermissionsStore } from '../stores/permissions/cognitiveProfilesPermissionsStore';

const { t } = useI18n();
const route = useRoute();

const {
	hasSaveActionAccess,
	hasReadAccess,
	hasCreateAccess,
	hasUpdateAccess,
	hasDeleteAccess,
} = useUserAccessControl();

const cognitiveProfileCardStore = useCognitiveProfileCardStore();
const { draftItemInstance } = storeToRefs(cognitiveProfileCardStore);

/** [Claude] a new profile is seeded with the defaults of the provider chosen in the create popup */
if (route.params.id === 'new') {
	draftItemInstance.value = getCognitiveProfileDefaults(
		route.query.type as StorageProviderType | undefined,
	);
}

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<CognitiveProfileCard>({
	useCardStore: useCognitiveProfileCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const tabs = computed(() => {
	const array: CardTab[] = [
		{
			text: modelValue.value.provider ?? t('objects.general'),
			value: 'general',
			pathName: CognitiveProfilesRouteNames.GENERAL,
		},
	];

	if (!isNew.value) {
		array.push({
			text: t('objects.permissions.permissions', 2),
			value: 'permissions',
			pathName: CognitiveProfilesRouteNames.PERMISSIONS,
		});
	}

	return array;
});

const { currentTab, changeTab } = useCardTabs(tabs);

const permissionsStoreData = computed(() => ({
	store: useCognitiveProfilesPermissionsStore,
	access: {
		read: hasReadAccess.value,
		create: hasCreateAccess.value,
		update: hasUpdateAccess.value,
		delete: hasDeleteAccess.value,
	},
	parentId: route.params.id,
}));

const { close } = useClose(RouteNames.COGNITIVE_PROFILES);

const path = computed(() => [
	{
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2),
		route: '/integrations/cognitive-profiles',
	},
	{
		name: isNew.value ? t('objects.new') : originalItemInstance.value?.name,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);
</script>
