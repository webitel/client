<template>
  <popup
    :title="$t('objects.permissions.object.newPermissionRole')"
    :primaryText="$t('objects.add')"
    :primaryAction="save"
    @close="$emit('close')"
    overflow
  >
    <section>
      <dropdown-select
        v-model="newGrantor"
        :options="computeAvailableGrantors"
        :placeholder="$t('objects.permissions.object.grantor')"
        @search="loadDropdownOptionsList"
      ></dropdown-select>

      <dropdown-select
        v-model="newGrantee"
        :options="computeAvailableGrantees"
        :placeholder="$t('objects.permissions.object.grantee')"
        @search="loadDropdownOptionsList"
      ></dropdown-select>
    </section>
  </popup>
</template>

<script>
import { mapActions, mapState } from "vuex";
import popup from "../../utils/popup";
import dropdownSelect from "../../utils/dropdown-select";
import { getRoleList } from "../../../api/permissions/roles/roles";

export default {
  name: "opened-object-permissions-role-defaults-popup",
  components: { popup, dropdownSelect },
  data() {
    return {
      newGrantee: "",
      newGrantor: "",
      dropdownOptionsList: [], // list of all roles to add new. retrieves from roles GET request
    };
  },

  mounted() {
    this.loadDropdownOptionsList();
  },

  computed: {
    ...mapState("permissions/objects", {
      dataList: (state) => state.recordsInstance.dataList,
    }),

    computeAvailableGrantees() {
      if (this.dataList) {
        return this.dropdownOptionsList.filter(
          (grantee) =>
            !this.dataList.some(
              (usedGrantee) => grantee.id === usedGrantee.grantee.id
            )
        );
      }
      return this.dropdownOptionsList;
    },

    computeAvailableGrantors() {
      if (this.dataList) {
        return this.dropdownOptionsList.filter(
          (grantor) =>
            !this.dataList.some(
              (usedGrantee) => grantor.id === usedGrantee.grantor.id
            )
        );
      }
      return this.dropdownOptionsList;
    },
  },

  methods: {
    async save() {
      try {
        await this.patchItem({
          grantee: this.newGrantee,
          grantor: this.newGrantor,
        });
        this.$emit("close");
      } catch (err) {
        throw err;
      }
    },

    // get all roles to choose which to add
    async loadDropdownOptionsList(search) {
      const response = await getRoleList(0, 10, search);
      this.dropdownOptionsList = [...response.list];
    },

    ...mapActions("permissions/objects", {
      patchItem: "ADD_DEFAULT_ITEM_ROLE",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
