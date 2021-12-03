<template>
  <section>
    <role-popup
      v-if="isRoleSelectPopup"
      :namespace="namespace"
      :sub-namespace="subNamespace"
      @close="closeRoleSelectPopup"
    ></role-popup>

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.permissions.object.rbacDefault') }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @input="setSearch"
          @search="loadList"
          @enter="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          class="icon-action"
          icon="refresh"
          :tooltip="$t('iconHints.reload')"
          @click="loadList"
        ></wt-icon-btn>
        <wt-icon-btn
          v-if="hasEditAccess"
          class="icon-action"
          icon="plus"
          :tooltip="$t('iconHints.add')"
          @click="openRoleSelectPopup"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :headers="headers"
          :data="dataList"
          :selectable="false"
          :grid-actions="false"
          sortable
          @sort="sort"
        >
          <template slot="grantor" slot-scope="{ item }">
            <role-column :role="item.grantor"></role-column>
          </template>

          <template slot="grantee" slot-scope="{ item }">
            <role-column :role="item.grantee"></role-column>
          </template>

          <template slot="read" slot-scope="{ item }">
            <wt-select
              :value="item.access.r"
              :options="accessOptions"
              :clearable="false"
              :disabled="!hasEditAccess"
              @input="changeReadAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template slot="edit" slot-scope="{ item }">
            <wt-select
              :value="item.access.w"
              :options="accessOptions"
              :clearable="false"
              :disabled="!hasEditAccess"
              @input="changeUpdateAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template slot="delete" slot-scope="{ item }">
            <wt-select
              :value="item.access.d"
              :options="accessOptions"
              :clearable="false"
              :disabled="!hasEditAccess"
              @input="changeDeleteAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>
        </wt-table>
      </div>
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
import RoleColumn from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-column.vue';
import RolePopup from './opened-object-permissions-rbac-role-popup.vue';
import permissionsTabMixin from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';

export default {
  name: 'opened-object-permissions-rbac',
  mixins: [permissionsTabMixin],
  components: { RolePopup, RoleColumn },
  data: () => ({
    subNamespace: 'rbac',
    headerTitle: '',
  }),
};

</script>

<style lang="scss" scoped>
</style>
