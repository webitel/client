<template>
  <wt-popup
    size="sm"
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ $t('objects.permissions.roles.addPermission') }}
    </template>
    <template #main>
      <form>
        <wt-select
          v-model="itemInstance.permission"
          :clearable="false"
          :label="$tc('objects.permissions.roles.permissions.permissions', 1)"
          :search-method="loadPermissionsList"
          :v="v$.itemInstance.permission"
          required
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import { mapActions, mapState } from 'vuex';
import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import RolesAPI from '../../api/roles';

export default {
  name: 'OpenedRolePermissionsPopup',
  mixins: [nestedObjectMixin],
  props: {
    editedIndex: {
      type: [Number, Object], // "null" object
    },
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
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
      get() {
        return this.itemInstanceValue;
      },
      set(value) {
        this.itemInstanceValue = value;
      },
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
    async loadPermissionsList(params) {
      const response = await RolesAPI.getPermissionsOptions({
        ...params,
        size: 5000,
      });
      response.items = response.items
        .filter((permission) =>
          this.permissions.every((addedPermission) => addedPermission.id !== permission.id),
        )
        .map((permission) => ({
          ...permission,
          name: this.$t(`objects.permissions.roles.permissions.${snakeToCamel(permission.id)}`),
        }));
      return response;
    },
    loadItem() {},
    resetState() {},
  },
};
</script>

<style scoped>

</style>
