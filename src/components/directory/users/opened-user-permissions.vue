<template>
  <section>
    <role-popup
        v-if="isRoleSelectPopup"
        @close="isRoleSelectPopup = false"
    ></role-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.permissions.object.operations') }}</h3>
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
            @click="isRoleSelectPopup = true"
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
          {{ item.grantee.name }}
        </template>

        <template slot="read" slot-scope="{ item }">
          <wt-checkbox
              :selected="item.access.r"
              :label="$t('objects.allow')"
              @change="changePermissions('r', item)"
          ></wt-checkbox>
        </template>

        <template slot="edit" slot-scope="{ item }">
          <wt-checkbox
              :selected="item.access.w"
              :label="$t('objects.allow')"
              @change="changePermissions('w', item)"
          ></wt-checkbox>
        </template>

        <template slot="delete" slot-scope="{ item }">
          <wt-checkbox
              :selected="item.access.d"
              :label="$t('objects.allow')"
              @change="changePermissions('d', item)"
          ></wt-checkbox>
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
import { mapActions, mapState } from 'vuex';
import RolePopup from './opened-user-permissions-role-popup.vue';
import tableComponentMixin from '../../../mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import editComponentMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';

export default {
  name: 'opened-user-permissions',
  mixins: [tableComponentMixin, editComponentMixin],
  components: { RolePopup },
  data() {
    return {
      isRoleSelectPopup: false,
      headers: [
        { value: 'grantee', text: this.$t('objects.name') },
        { value: 'read', text: this.$t('objects.read') },
        { value: 'edit', text: this.$t('objects.edit') },
        { value: 'delete', text: this.$t('objects.delete') },
      ],
    };
  },

  watch: {
    parentId(value) {
      this.setParentId(value);
    },
  },

  computed: {
    ...mapState('directory/users', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('directory/users/permissions', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
  },

  methods: {
    ...mapActions('directory/users/permissions', {
      setParentId: 'SET_PARENT_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      patchItem: 'PATCH_ITEM_PERMISSIONS',
    }),

    changePermissions(rule, item) {
      const index = this.dataList.indexOf(item);
      this.patchItem({ prop: rule, index });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';
</style>
