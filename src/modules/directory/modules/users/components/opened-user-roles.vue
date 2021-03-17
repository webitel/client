<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.permissions.permissionsRole') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
          :value="roles"
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
import { mapState, mapActions } from 'vuex';
import { getRoleList } from '../../../../permissions/modules/roles/api/roles';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-roles',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('directory/users', {
      roles: (state) => state.itemInstance.roles,
    }),
  },

  methods: {
    ...mapActions('directory/users', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),

    async loadDropdownOptionsList(search) {
      const response = await getRoleList({ search });
      if (response.list) {
        return response.list.map((item) => ({
          name: item.name,
          id: item.id,
        }));
      }
      return [];
    },
  },
};
</script>
