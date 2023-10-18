<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.permissions.permissionsRole') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :close-on-select="false"
        :disabled="disableUserInput"
        :label="$tc('objects.permissions.permissionsRole')"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.roles"
        multiple
        @input="setItemProp({ prop: 'roles', value: $event })"
      ></wt-select>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';

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
