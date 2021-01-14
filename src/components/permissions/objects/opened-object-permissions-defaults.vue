<template>
  <section>
    <role-popup
      v-if="popupTriggerIf"
      @close="popupTriggerIf = false"
    ></role-popup>

    <header ref="rbac" class="content-header">
      <h3 class="content-title">
        {{ $t("objects.permissions.object.defaultList") }}
      </h3>
      <div class="content-header__actions-wrap">
        
        <wt-icon-btn
          class="icon-action"
          icon="refresh"
          :tooltip="$t('iconHints.reload')"
          @click="loadList"
        ></wt-icon-btn>
        <wt-icon-btn
          class="icon-action"
          icon="plus"
          :tooltip="$t('iconHints.add')"
          @click="popupTriggerIf = true"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <wt-table
        :headers="headers"
        :data="defaultList"
        :selectable="false"
        :grid-actions="false"
      >
        <template slot="grantor" slot-scope="{ item }">
          <div>
            {{ item.grantor.name }}
          </div>
        </template>

        <template slot="grantee" slot-scope="{ item }">
          <div>
            {{ item.grantee.name }}
          </div>
        </template>

        <template slot="read" slot-scope="{ item }">
          <wt-select
            :value="item.perm.r"
            :options="dropdownOptionsList"
            :clearable='false'
            allow-empty: false
            track-by="name"            
            @input="
              toggleDefaultMode({
                mode: $event,
                ruleName: 'r',
                item: item,
              })
            "
          ></wt-select>
        </template>

        <template slot="write" slot-scope="{ item }">
          <wt-select
            :value="item.perm.w"
            :options="dropdownOptionsList"
            :clearable='false'
            track-by="name"
            @input="
              toggleDefaultMode({
                mode: $event,
                ruleName: 'w',
                item: item,
              })
            "
          ></wt-select>
        </template>

        <template slot="delete" slot-scope="{ item }">
          <wt-select
            :value="item.perm.d"
            :options="dropdownOptionsList"
            :clearable='false'
            track-by="name"
            @input="
              toggleDefaultMode({
                mode: $event,
                ruleName: 'd',
                item: item,
              })
            "
          ></wt-select>
        </template>
      </wt-table>
      <wt-pagination
        :size="size"
        :next="isNext"
        :prev="page > 1"
        debounce
        @next="nextPage"
        @prev="prevPage"
        @input="setSize"
        @change="loadList"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import tableComponentMixin from "@/mixins/tableComponentMixin";
import editComponentMixin from "@/mixins/editComponentMixin";
import { mapActions, mapState } from "vuex";
import { getObject } from "../../../api/permissions/objects/objects";
import rolePopup from "./opened-object-permissions-role-defaults-popup";

export default {
  name: "opened-object-permissions-defaults",
  mixins: [tableComponentMixin, editComponentMixin],
  components: { rolePopup },
  data() {
    return {
      headerTitle: "", // header title. retieves from object GET request
      // [R]ecord-[b]ased [A]ccess [C]ontrol section (!)
      headers: [
        {
          value: "grantor",
          text: this.$t("objects.permissions.object.grantor"),
        },
        {
          value: "grantee",
          text: this.$t("objects.permissions.object.grantee"),
        },
        { value: "read", text: this.$t("objects.read") },
        { value: "write", text: this.$t("objects.edit") },
        { value: "delete", text: this.$t("objects.delete") },
      ],
      dropdownOptionsList: [
        {
          name: "Forbidden",
          id: 1,
        },

        {
          name: "Allow",
          id: 2,
        },
        {
          name: "Allow with delegation",
          id: 3,
        },
      ],
    };
  },

  mounted() {
    this.id = this.$route.params.id;
  },
  computed: {
    ...mapState("permissions/objects", {
      defaultList: (state) => state.recordsInstance.dataList,
      search: (state) => state.recordsInstance.search,
      size: (state) => state.recordsInstance.size,
      page: (state) => state.recordsInstance.page,
      isNext: (state) => state.recordsInstance.isItemNextPage,
    }),
  },

  methods: {
    ...mapActions("permissions/objects", {
      setId: "SET_ITEM_ID",
      setSize: "SET_RECORDS_PERMISSIONS_SIZE",
      setSearch: "SET_RECORDS_PERMISSIONS_SEARCH",
      nextPage: "NEXT_RECORDS_PERMISSIONS_PAGE",
      prevPage: "PREV_RECORDS_PERMISSIONS_PAGE",

      loadDataList: "SEARCH_DEFAULT_LIST",
      toggleDefaultMode: "TOGGLE_DEFAULT_MODE",
    }),

    // get object title to show on page header
    async loadHeaderTitle(id) {
      this.headerTitle = await getObject(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/objects/table-page";
</style>
