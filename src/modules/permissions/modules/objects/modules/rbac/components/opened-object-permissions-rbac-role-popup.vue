<template>
  <wt-popup
    class="permissions-role-defaults-popup"
    size="sm"
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template #main>
      <permissions-role-select
        v-model:model-value="newGrantor"
        :show-clear="false"
        :placeholder="$t('objects.permissions.object.grantor')"
        :search-method="loadRoles"
      />
      <permissions-role-select
        v-model:model-value="newGrantee"
        :show-clear="false"
        :placeholder="$t('objects.permissions.object.grantee')"
        :search-method="loadRoles"
      />
    </template>
    <template #actions>
      <wt-button @click="save">
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import permissionsTabRolePopupMixins from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabRolePopupMixin';
import PermissionsRoleSelect from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-select.vue';

export default {
	name: 'OpenedObjectPermissionsRbacRolePopup',
	components: {
		PermissionsRoleSelect,
	},
	mixins: [
		permissionsTabRolePopupMixins,
	],
	data: () => ({
		newGrantor: null,
	}),

	methods: {
		async save() {
			await this.addRolePermissions({
				grantee: this.newGrantee,
				grantor: this.newGrantor,
			});
			this.close();
		},
	},
};
</script>

<style lang="scss" scoped>
.permissions-role-defaults-popup {
  .permissions-role-select:not(:last-child) {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
