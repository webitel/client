<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.permissions.roles.addPermission') }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          v-model="itemInstance.permission"
          :v="$v.itemInstance.permission"
          :label="$tc('objects.permissions.roles.permissions', 1)"
          :search="loadPermissionsList"
          :internal-search="false"
          :clearable="false"
          required
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { getPermissionsOptions } from '../../../../api/permissions/roles/roles';
import nestedObjectMixin from '../../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-role-permissions-popup',
  mixins: [nestedObjectMixin],
  props: {
    editedIndex: {
      type: [Number, Object], // "null" object
    },
  },
  data: () => ({
    namespace: 'permissions/roles',
    itemInstanceValue: {
      permission: {},
    },
  }),
  validations: {
    itemInstance: {
      permission: { required },
    },
  },
  created() {
    this.initEditedValue();
  },
  computed: {
    ...mapState('permissions/roles', {
      permissions: (state) => state.itemInstance.permissions,
    }),
    // override mixin map state
    itemInstance: {
      get() { return this.itemInstanceValue; },
      set(value) { this.itemInstanceValue = value; },
    },
    computeDisabled() {
      return this.checkValidations();
    },
  },
  methods: {
    ...mapActions({
      addPermission(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_ROLE_PERMISSION`, payload);
      },
      updatePermission(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_ROLE_PERMISSION`, payload);
      },
    }),
    initEditedValue() {
      if (Number.isInteger(this.editedIndex)) {
        this.itemInstance.permission = this.permissions[this.editedIndex];
      }
    },
    save() {
      if (Number.isInteger(this.editedIndex)) {
        this.updatePermission({
          index: this.editedIndex,
          permission: this.itemInstance.permission,
        });
      } else {
        this.addPermission(this.itemInstance.permission);
      }
      this.close();
    },
    async loadPermissionsList(search) {
      const response = await getPermissionsOptions({ search });
      return response.list.filter((permission) => (
        this.permissions.every((addedPermission) => addedPermission.id !== permission.id)
      ));
    },
    loadItem() {},
    resetState() {},
  },
};
</script>

<style scoped>

</style>
