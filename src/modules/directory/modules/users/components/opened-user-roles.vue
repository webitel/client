<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.permissions.permissionsRole') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :value="itemInstance.roles"
        :label="$tc('objects.permissions.permissionsRole')"
        :search-method="loadDropdownOptionsList"
        :close-on-select="false"
        :disabled="disableUserInput"
        multiple
        @input="setItemProp({ prop: 'roles', value: $event })"
      ></wt-select>
    </div>
  </section>
</template>

<script>
import RolesAPI from '../../../../permissions/modules/roles/api/roles';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-roles',
  mixins: [openedTabComponentMixin],
  methods: {
    loadDropdownOptionsList(params) {
      return RolesAPI.getLookup(params);
    },
  },
};
</script>
