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
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="refresh"
              @click="loadList"
            ></wt-icon-btn>
          </template>
          {{ $t('iconHints.reload') }}
        </wt-tooltip>
        <add-action
          v-if="hasEditAccess"
          @click="openRoleSelectPopup"
        ></add-action>
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
          <template v-slot:grantor="{ item }">
            <role-column :role="item.grantor"></role-column>
          </template>

          <template v-slot:grantee="{ item }">
            <role-column :role="item.grantee"></role-column>
          </template>

          <template v-slot:read="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.r"
              @input="changeReadAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template v-slot:edit="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.w"
              @input="changeUpdateAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template v-slot:delete="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.d"
              @input="changeDeleteAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>
          <template v-slot:actions="{ item }">
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
import AddAction from '../../../../../../../app/components/actions/add-action';
import permissionsTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import RoleColumn from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-column.vue';
import RolePopup from './opened-object-permissions-rbac-role-popup.vue';

export default {
  name: 'opened-object-permissions-rbac',
  mixins: [permissionsTabMixin],
  components: {
    AddAction,
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
