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
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          :tooltip="$t('iconHints.reload')"
          class="icon-action"
          icon="refresh"
          @click="loadList"
        ></wt-icon-btn>
        <wt-icon-btn
          v-if="hasEditAccess"
          :tooltip="$t('iconHints.add')"
          class="icon-action"
          icon="plus"
          @click="openRoleSelectPopup"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :data="dataList"
          :grid-actions="!disableUserInput"
          :headers="headers"
          :selectable="false"
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
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.r"
              @input="changeReadAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template slot="edit" slot-scope="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.w"
              @input="changeUpdateAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template slot="delete" slot-scope="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.d"
              @input="changeDeleteAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>
          <template slot="actions" slot-scope="{ item }">
            <delete-action
              @click="changeReadAccessMode({ item, mode: { id: accessMode.FORBIDDEN }})"
            ></delete-action>
          </template>
        </wt-table>
      </div>
      <wt-pagination
        :next="isNext"
        :prev="page > 1"
        :size="size"
        debounce
        @change="loadList"
        @input="setSize"
        @next="nextPage"
        @prev="prevPage"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import permissionsTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import RoleColumn from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-column.vue';
import RolePopup from './opened-object-permissions-rbac-role-popup.vue';

export default {
  name: 'opened-object-permissions-rbac',
  mixins: [permissionsTabMixin],
  components: {
    RolePopup,
    RoleColumn,
  },
  data: () => ({
    subNamespace: 'rbac',
    headerTitle: '',
  }),
};

</script>

<style lang="scss" scoped>
</style>
