<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.permissions.permissionsRole') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        :value="itemInstance.roles"
        :label="$tc('objects.permissions.permissionsRole')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :close-on-select="false"
        :disabled="disableUserInput"
        multiple
        @input="setItemProp({ prop: 'roles', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import { getRoleList } from '../../../../permissions/modules/roles/api/roles';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-roles',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getRoleList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>
