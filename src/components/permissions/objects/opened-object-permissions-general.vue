<template>
  <section>
    <role-popup
      v-if="popupTriggerIf"
      @close="popupTriggerIf = false"
    ></role-popup>

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc("objects.permissions.object.operations", 2) }}
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
        :data="dataList"
        :selectable="false"
        :grid-actions="false"
      >
        <template slot="grantee" slot-scope="{ item }">
          <div>
            {{ item.grantee.name }}
          </div>
        </template>

        <template slot="create" slot-scope="{ item }">
          <wt-select
            :value="item.access.c"
            :options="dropdownOptionsList"
            :clearable="false"
            track-by="name"
            @input="
              patchItem({
                mode: $event,
                ruleName: 'c',
                item: item,
              })
            "
          ></wt-select>
        </template>

        <template slot="read" slot-scope="{ item }">
          <wt-select
            :value="item.access.r"
            :options="dropdownOptionsList"
            :clearable="false"
            track-by="name"
            @input="
              patchItem({
                mode: $event,
                ruleName: 'r',
                item: item,
              })
            "
          ></wt-select>
        </template>

        <template slot="edit" slot-scope="{ item }">
          <wt-select
            :value="item.access.w"
            :options="dropdownOptionsList"
            :clearable="false"
            track-by="name"
            @input="
              patchItem({
                mode: $event,
                ruleName: 'w',
                item: item,
              })
            "
          ></wt-select>
        </template>

        <template slot="delete" slot-scope="{ item }">
          <wt-select
            :value="item.access.d"
            :options="dropdownOptionsList"
            :clearable="false"
            track-by="name"
            @input="
              patchItem({
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
        :next="isNextPage"
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
import { mapActions, mapState } from "vuex";
import tableComponentMixin from "../../../mixins/tableComponentMixin";
import editComponentMixin from "../../../mixins/editComponentMixin";

// eslint-disable-next-line import/extensions
import rolePopup from "./opened-object-permissions-role-popup";

export default {
  name: "opened-object-permissions-general",
  mixins: [tableComponentMixin, editComponentMixin],
  components: { rolePopup },
  data() {
    return {
      // vuetable prop
      headers: [
        {
          value: "grantee",
          text: this.$t("objects.permissions.object.grantee"),
        },
        { value: "create", text: this.$t("objects.create") },
        { value: "read", text: this.$t("objects.read") },
        { value: "edit", text: this.$t("objects.edit") },
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
      headerTitle: "",
    };
  },

  mounted() {
    this.id = this.$route.params.id;
    this.loadList();
  },
  computed: {
    ...mapState("permissions/objects", {
      dataList: (state) => state.operationInstance.dataList,
      page: (state) => state.operationInstance.page,
      size: (state) => state.operationInstance.size,
      search: (state) => state.operationInstance.search,
      isNextPage: (state) => state.operationInstance.isItemNextPage,
    }),

    id: {
      get() {
        return this.$store.state.permissions.objects.itemId;
      },
      set(value) {
        this.setId(value);
      },
    },
  },

  methods: {
    ...mapActions("permissions/objects", {
      setId: "SET_ITEM_ID",
      setItemProp: "SET_ITEM_PROPERTY",
      loadDataList: "LOAD_ITEM_PERMISSIONS_DATA_lIST",
      patchItem: "TOGGLE_GENERAL_MODE",
      setSize: "SET_OPERATION_PERMISSIONS_SIZE",
      setSearch: "SET_OPERATION_PERMISSIONS_SEARCH",
      nextPage: "NEXT_OPERATION_PERMISSIONS_PAGE",
      prevPage: "PREV_OPERATION_PERMISSIONS_PAGE",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/objects/table-page";
</style>
