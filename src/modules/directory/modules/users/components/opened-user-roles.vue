<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.permissions.permissionsRole') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-multi-select
        :disabled="disableUserInput"
        :label="$t('objects.permissions.permissionsRole')"
        :search-method="loadDropdownOptionsList"
        :model-value="itemInstance.roles"
        @update:model-value="setItemProp({ prop: 'roles', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';

export default {
	name: 'OpenedUserRoles',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	methods: {
		loadDropdownOptionsList(params) {
			return RolesAPI.getLookup(params);
		},
	},
};
</script>
