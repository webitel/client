<template>
  <section class="table-section">
    <opened-role-permission-popup
      :permissions="modelValue.permissions ?? []"
      @add="add"
    />
    <delete-confirmation-popup
      :callback="deleteCallback"
      :delete-count="deleteCount"
      :shown="isDeleteConfirmationPopup"
      @close="closeDelete"
    />

    <header class="table-title opened-role-permissions__header">
      <wt-action-bar
        :include="[IconAction.ADD, IconAction.DELETE]"
        :disabled:add="disableUserInput"
        :disabled:delete="disableUserInput || !selected.length"
        @click:add="openPopup"
        @click:delete="
          askDeleteConfirmation({
            deleted: selected,
            callback: () => remove(selected),
          })
        "
      />
    </header>

    <div class="table-section__table-wrapper">
      <wt-table
        :data="permissions"
        :headers="headers"
        :selected="selected"
        @update:selected="selected = $event"
      >
        <template #name="{ item }">
          {{ t(`objects.permissions.roles.permissions.${snakeToCamel(item.id)}`) }}
        </template>
        <template #usage="{ item }">
          {{ t(`objects.permissions.roles.permissions.${snakeToCamel(item.id)}Description`) }}
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="disableUserInput"
            action="delete"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => remove([item]),
              })
            "
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {
	RoleCard,
	RolePermission,
} from '@webitel/api-services/validations';
import { IconAction } from '@webitel/ui-sdk/enums';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import OpenedRolePermissionPopup from './opened-role-permission-popup.vue';

const modelValue = defineModel<RoleCard>({
	required: true,
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { disableUserInput } = useUserAccessControl();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const headers = computed(() => [
	{
		value: 'name',
		text: t('objects.name'),
	},
	{
		value: 'usage',
		text: t('objects.permissions.roles.usage'),
	},
]);

/** [Claude] [WTEL-6858] "reset active attempts" is not managed here, so it is not listed */
const permissions = computed(() =>
	(modelValue.value.permissions ?? []).filter(
		({ id }) => id !== SpecialGlobalAction.ResetActiveAttempts,
	),
);

const selected = ref<RolePermission[]>([]);

const add = (permission: RolePermission) => {
	modelValue.value.permissions = [
		...(modelValue.value.permissions ?? []),
		permission,
	];
};

const remove = (deleted: RolePermission[]) => {
	const deletedIds = deleted.map(({ id }) => id);
	modelValue.value.permissions = (modelValue.value.permissions ?? []).filter(
		({ id }) => !deletedIds.includes(id),
	);
	selected.value = [];
};

/** [Claude] the popup is opened by the route, as the other card popups */
const openPopup = () =>
	router.push({
		name: route.name,
		query: route.query,
		params: {
			...route.params,
			permissionIndex: 'new',
		},
	});
</script>

<style scoped>
.opened-role-permissions__header {
  justify-content: flex-end;
}
</style>
