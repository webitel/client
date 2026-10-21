<template>
  <wt-popup
    :shown="!!editedApp"
    :size="ComponentSize.SM"
    @close="close"
  >
    <template #title>
      {{ t('objects.permissions.roles.applicationsAccess.applicationsAccess', 1) }}:
      {{ t(`WtApplication.${editedApp}.name`) }}
    </template>
    <template #main>
      <div class="opened-application-access-popup__wrapper">
        <wt-checkbox
          v-for="section of sections"
          :key="section.name"
          :label="section.displayName"
          :selected="section.enabled"
          :value="true"
          @update:selected="updateSectionAccess(section, $event as boolean)"
        />
      </div>
    </template>
    <template #actions>
      <wt-button @click="close">
        {{ t('objects.ok') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { AdjunctTypesAPI } from '@webitel/api-services/api';
import type { ProtoDataStruct } from '@webitel/api-services/gen/models';
import type { ApplicationsAccessTree } from '@webitel/api-services/scripts';
import type { RoleCard } from '@webitel/api-services/validations';
import { WtCheckbox } from '@webitel/ui-sdk/components';
import { useClose } from '@webitel/ui-sdk/composables';
import {
	ButtonColor,
	ComponentSize,
	WtApplication,
} from '@webitel/ui-sdk/enums';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import RolesRouteNames from '../../router/_internals/RolesRouteNames.enum';

interface SectionAccess {
	name: string;
	displayName: string;
	enabled: boolean;
	/** [Claude] a crm adjunct type, not a section of the access schema */
	custom: boolean;
}

const modelValue = defineModel<RoleCard>({
	required: true,
});

const { t } = useI18n();
const route = useRoute();

const editedApp = computed(() => route.params.applicationName as string);

const application = computed(
	() =>
		((modelValue.value.metadata?.access ?? {}) as ApplicationsAccessTree)[
			editedApp.value
		] ?? {},
);

/** [Claude] aka "adjunct types" of the crm app, each one has its own access */
const customTypes = ref<ProtoDataStruct[]>([]);

watch(
	editedApp,
	async (app) => {
		if (app !== WtApplication.Crm || customTypes.value.length) return;
		const { items } = await AdjunctTypesAPI.getList({
			size: -1,
		});
		customTypes.value = items;
	},
	{
		immediate: true,
	},
);

const sections = computed<SectionAccess[]>(() => {
	if (!editedApp.value) return [];

	const coreSections = Object.keys(application.value)
		// "functional" properties start with _
		.filter((section) => !section.startsWith('_'))
		.filter((section) => !application.value[section]._custom)
		// a section moved to another app (admin "pause-templates" → WFM) stays in roles saved earlier, but has no schema `_locale` anymore
		.filter((section) => !!application.value[section]._locale)
		.map((section) => ({
			name: section,
			displayName: t(application.value[section]._locale),
			enabled: !!application.value[section]._enabled,
			custom: false,
		}));

	const customSections =
		editedApp.value === WtApplication.Crm
			? customTypes.value.map((customType) => ({
					name: customType.repo as string,
					displayName: customType.name as string,
					enabled: !!application.value[customType.repo as string]?._enabled,
					custom: true,
				}))
			: [];

	return [
		...coreSections,
		...customSections,
	];
});

const updateSectionAccess = (
	{ name, custom }: SectionAccess,
	value: boolean,
) => {
	application.value[name] = {
		...application.value[name],
		_enabled: value,
		...(custom && {
			_custom: true,
		}),
	};
};

const { close } = useClose(RolesRouteNames.APPLICATIONS_ACCESS);
</script>

<style scoped>
.opened-application-access-popup__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
