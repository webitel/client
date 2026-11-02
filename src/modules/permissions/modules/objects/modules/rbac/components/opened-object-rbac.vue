<template>
  <section class="table-section">
    <opened-object-rbac-role-popup :add="addRolePermissions" />

    <header class="table-title opened-object-rbac__header">
      <wt-action-bar
        :include="[IconAction.ADD, IconAction.REFRESH]"
        :disabled:add="!access.update"
        @click:add="openPopup"
        @click:refresh="loadDataList"
      />
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        :data="localizedDataList"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="updateSort"
      >
        <template #grantor="{ item }">
          <permissions-role-row :role="item.grantor" />
        </template>

        <template #grantee="{ item }">
          <permissions-role-row :role="item.grantee" />
        </template>

        <template
          v-for="(ruleName, column) of AccessRuleColumn"
          :key="column"
          #[column]="{ item }"
        >
          <wt-single-select
            :show-clear="false"
            :disabled="!access.update"
            :options="accessOptions"
            :model-value="item.access[ruleName]"
            @update:model-value="changeAccessMode({ item, ruleName, mode: $event })"
          />
        </template>

        <template #actions="{ item }">
          <wt-icon-action
            :disabled="!access.update"
            action="delete"
            @click="changeAccessMode({ item, ruleName: AccessRuleName.R, mode: { id: AccessMode.Forbidden } })"
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

<script setup lang="ts">
import { ObjectClassesAPI } from '@webitel/api-services/api';
import {
	AccessMode,
	AccessRuleColumn,
	AccessRuleName,
	type ChangeAccessModePayload,
	type PermissionEntity,
	type PermissionGrantee,
	PermissionsRoleRow,
	type PermissionsUserAccess,
	resolveGrants,
	useAccessModeOptions,
} from '@webitel/ui-datalist/permissions';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useObjectsRbacStore } from '../stores/objectsRbacStore';
import OpenedObjectRbacRolePopup from './opened-object-rbac-role-popup.vue';

/** [Claude] an acl row, plus the role whose records it is about */
type RbacItem = PermissionEntity & {
	grantor: PermissionGrantee;
};

const props = defineProps<{
	parentId: string;
	access: PermissionsUserAccess;
}>();

const route = useRoute();
const router = useRouter();

const objectsRbacStore = useObjectsRbacStore();

const { dataList, error, isLoading, headers, page, size, next } =
	storeToRefs(objectsRbacStore);

const { initialize, loadDataList, updatePage, updateSize, updateSort, $reset } =
	objectsRbacStore;

initialize({
	parentId: props.parentId,
});

onUnmounted(() => {
	$reset();
});

const { accessOptions, localizedDataList } = useAccessModeOptions(
	() => dataList.value as RbacItem[],
);

const patchRbac = async ({
	grantorId,
	changes,
}: {
	grantorId: PermissionGrantee['id'];
	changes: Record<string, unknown>;
}) => {
	try {
		await ObjectClassesAPI.patchRbac({
			parentId: props.parentId,
			grantorId: +grantorId,
			changes: [
				changes,
			],
		});
	} finally {
		await loadDataList();
	}
};

const changeAccessMode = ({
	item,
	ruleName,
	mode,
}: Omit<ChangeAccessModePayload, 'item'> & {
	item: RbacItem;
}) => {
	const grants = resolveGrants({
		have: item.access[ruleName],
		ruleName,
		mode,
	});
	if (!grants) return;

	return patchRbac({
		grantorId: item.grantor.id,
		changes: {
			grantee: +item.grantee.id,
			grants,
		},
	});
};

const addRolePermissions = ({
	grantor,
	grantee,
}: Pick<RbacItem, 'grantor' | 'grantee'>) =>
	patchRbac({
		grantorId: grantor.id,
		changes: {
			grantor: +grantor.id,
			grantee: +grantee.id,
			granted: AccessRuleName.R,
		},
	});

const openPopup = () =>
	router.push({
		name: route.name,
		query: route.query,
		hash: route.hash,
		params: {
			...route.params,
			permissionId: 'new',
		},
	});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	isLoading,
});
</script>

<style scoped>
/* [Claude] no title in the header, so push the action bar to the right */
.opened-object-rbac__header {
	justify-content: flex-end;
}
</style>
