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
        <wt-icon-action
          v-if="hasEditAccess"
          action="add"
          @click="openRoleSelectPopup"
        ></wt-icon-action>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
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
            <wt-icon-action
              action="delete"
              class="table-action"
              @click="changeReadAccessMode({ item, mode: { id: accessMode.FORBIDDEN }})"
            ></wt-icon-action>
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
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'permissions/objects';
const subNamespace = 'rbac';

export default {
  name: 'opened-object-permissions-rbac',
  mixins: [permissionsTabMixin],
  components: {
    RolePopup,
    RoleColumn,
  },
  data: () => ({
    namespace,
    subNamespace,
    headerTitle: '',
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
};

</script>

<style lang="scss" scoped>
</style>
