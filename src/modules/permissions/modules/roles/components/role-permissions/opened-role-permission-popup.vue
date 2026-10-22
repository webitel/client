<template>
  <wt-popup
    :shown="!!permissionIndex"
    :size="ComponentSize.SM"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.permissions.roles.addPermission') }}
    </template>
    <template #main>
      <wt-single-select
        v-model:model-value="permission"
        :label="t('objects.permissions.roles.permissions.permissions', 1)"
        :search-method="searchPermissions"
        :show-clear="false"
        required
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="!permission?.id"
        @click="add"
      >
        {{ t('objects.add') }}
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
import { RolesAPI } from '@webitel/api-services/api';
import type { RolePermission } from '@webitel/api-services/validations';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor, ComponentSize } from '@webitel/ui-sdk/enums';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import RolesRouteNames from '../../router/_internals/RolesRouteNames.enum';

const props = defineProps<{
	permissions: RolePermission[];
}>();

const emit = defineEmits<{
	add: [
		RolePermission,
	];
}>();

const { t } = useI18n();
const route = useRoute();

const permissionIndex = computed(() => route.params.permissionIndex);

const permission = ref<RolePermission | null>(null);

watch(permissionIndex, () => {
	permission.value = null;
});

/** [Claude] the permissions the role doesn't have yet; [WTEL-6858] "reset active attempts" is not managed here */
const searchPermissions = async (params: object) => {
	const response = await RolesAPI.getPermissionsOptions({
		...params,
		size: 5000,
	});
	const addedIds = props.permissions.map(({ id }) => id);
	return {
		...response,
		items: response.items
			.filter(
				({ id }: RolePermission) =>
					!addedIds.includes(id) &&
					id !== SpecialGlobalAction.ResetActiveAttempts,
			)
			.map((option: RolePermission) => ({
				...option,
				name: t(
					`objects.permissions.roles.permissions.${snakeToCamel(option.id)}`,
				),
			})),
	};
};

const { close } = useClose(RolesRouteNames.ROLE_PERMISSIONS);

const add = () => {
	if (!permission.value) return;
	emit('add', permission.value);
	close();
};
</script>
