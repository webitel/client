<template>
  <section class="table-section">
    <role-popup
      :shown="isRoleSelectPopup"
      :namespace="namespace"
      :sub-namespace="subNamespace"
      @close="closeRoleSelectPopup"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.permissions.object.rbacDefault') }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        />

        <wt-icon-btn
          v-tooltip="$t('iconHints.reload')"
          icon="refresh"
          @click="loadList"
        />

        <wt-icon-action
          v-if="hasUpdateAccess"
          action="add"
          @click="addItem"
        />
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :dark-mode="darkMode"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :data="dataList"
          :grid-actions="!disableUserInput"
          :headers="headers"
          :selectable="false"
          sortable
          @sort="sort"
        >
          <template #grantor="{ item }">
            <role-column :role="item.grantor" />
          </template>

          <template #grantee="{ item }">
            <role-column :role="item.grantee" />
          </template>

          <template #read="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasUpdateAccess"
              :options="accessOptions"
              :value="item.access.r"
              @input="changeReadAccessMode({ item, mode: $event })"
            />
          </template>

          <template #edit="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasUpdateAccess"
              :options="accessOptions"
              :value="item.access.w"
              @input="changeUpdateAccessMode({ item, mode: $event })"
            />
          </template>

          <template #delete="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasUpdateAccess"
              :options="accessOptions"
              :value="item.access.d"
              @input="changeDeleteAccessMode({ item, mode: $event })"
            />
          </template>
          <template #actions="{ item }">
            <wt-icon-action
              action="delete"
              @click="changeReadAccessMode({ item, mode: { id: accessMode.FORBIDDEN } })"
            />
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
      />
    </div>
  </section>
</template>

<script>
import { useDummy } from '../../../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import permissionsTabMixin from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import RoleColumn from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-column.vue';
import RolePopup from './opened-object-permissions-rbac-role-popup.vue';

const namespace = 'permissions/objects';
const subNamespace = 'rbac';

export default {
  name: 'OpenedObjectPermissionsRbac',
  components: {
    RolePopup,
    RoleColumn,
  },
  mixins: [permissionsTabMixin],
  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
    });
    const { hasUpdateAccess } = useUserAccessControl();
    return { dummy, hasUpdateAccess };
  },
  data: () => ({
    namespace,
    subNamespace,
    headerTitle: '',
  }),
};
</script>

<style
  lang="scss"
  scoped
></style>
