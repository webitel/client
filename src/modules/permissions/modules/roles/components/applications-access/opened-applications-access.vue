<template>
  <section class="table-section">
    <opened-application-access-popup v-model:model-value="modelValue" />

    <div class="table-section__table-wrapper">
      <wt-table
        :data="applications"
        :headers="headers"
        :selectable="false"
      >
        <template #name="{ item }">
          {{ item.displayName }}
        </template>
        <template #access="{ item }">
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="item.enabled"
            @update:model-value="updateApplicationAccess(item.name, $event)"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            v-if="item.hasSections"
            :disabled="disableUserInput || !item.enabled"
            action="edit"
            @click="edit(item.name)"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ApplicationsAccessTree } from '@webitel/api-services/scripts';
import type { RoleCard } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import OpenedApplicationAccessPopup from './opened-application-access-popup.vue';

const modelValue = defineModel<RoleCard>({
	required: true,
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { disableUserInput } = useUserAccessControl();

const access = computed(
	() => (modelValue.value.metadata?.access ?? {}) as ApplicationsAccessTree,
);

/** [Claude] "_"-prefixed keys configure the node itself, the rest are its sections */
const getSections = (node: Record<string, unknown>) =>
	Object.keys(node).filter((key) => !key.startsWith('_'));

const headers = computed(() => [
	{
		value: 'name',
		text: t('objects.name'),
	},
	{
		value: 'access',
		text: t('objects.permissions.roles.applicationsAccess.access'),
	},
]);

const applications = computed(() =>
	Object.entries(access.value).map(([name, application]) => ({
		name,
		displayName: t(application._locale),
		enabled: application._enabled,
		hasSections: !!getSections(application).length,
	})),
);

/** [Claude] an app is switched together with all of its sections */
const updateApplicationAccess = (app: string, value: boolean) => {
	const application = access.value[app];
	application._enabled = value;
	getSections(application).forEach((section) => {
		application[section]._enabled = value;
	});
};

const edit = (applicationName: string) =>
	router.push({
		name: route.name,
		query: route.query,
		params: {
			...route.params,
			applicationName,
		},
	});
</script>
