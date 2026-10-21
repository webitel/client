<template>
  <wt-popup
    :shown="shown"
    :size="ComponentSize.SM"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template #main>
      <div class="opened-object-rbac-role-popup__wrapper">
        <permissions-role-select
          v-model:model-value="grantor"
          :clearable="false"
          :placeholder="t('objects.permissions.object.grantor')"
          :search-method="RolesAPI.getLookup"
        />
        <permissions-role-select
          v-model:model-value="grantee"
          :clearable="false"
          :placeholder="t('objects.permissions.object.grantee')"
          :search-method="RolesAPI.getLookup"
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="!grantor || !grantee"
        @click="save"
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
import {
	type PermissionGrantee,
	PermissionsRoleSelect,
} from '@webitel/ui-datalist/permissions';
// [Claude] TODO: remove after the roles refactor (WTEL-10721) — import { RolesAPI } from '@webitel/api-services/api' instead
import RolesAPI from '@webitel/ui-sdk/api/clients/roles/roles';
import { ButtonColor, ComponentSize } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
	add: (payload: {
		grantor: PermissionGrantee;
		grantee: PermissionGrantee;
	}) => Promise<unknown>;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const grantor = ref<PermissionGrantee | null>(null);
const grantee = ref<PermissionGrantee | null>(null);

/** [Claude] the popup is opened by the route, as the shared permissions tab does it */
const shown = computed(() => !!route.params.permissionId);

const close = () => {
	const { permissionId, ...params } = route.params;
	grantor.value = null;
	grantee.value = null;
	return router.push({
		name: route.name,
		query: route.query,
		hash: route.hash,
		params,
	});
};

const save = async () => {
	await props.add({
		grantor: grantor.value as PermissionGrantee,
		grantee: grantee.value as PermissionGrantee,
	});
	return close();
};
</script>

<style scoped>
.opened-object-rbac-role-popup__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
