<template>
  <section>
    <role-popup
      :shown="isRoleSelectPopup"
      :namespace="namespace"
      :sub-namespace="subNamespace"
      @close="closeRoleSelectPopup"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.permissions.object.operations', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
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
          v-if="hasEditAccess"
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
      class="table-wrapper"
    >
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :data="dataList"
          :headers="headers"
          :selectable="false"
          sortable
          @sort="sort"
        >
          <template #grantee="{ item }">
            <role-column :role="item.grantee" />
          </template>

          <template #create="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.x"
              @input="changeCreateAccessMode({ item, mode: $event })"
            />
          </template>

          <template #read="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.r"
              @input="changeReadAccessMode({ item, mode: $event })"
            />
          </template>

          <template #edit="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.w"
              @input="changeUpdateAccessMode({ item, mode: $event })"
            />
          </template>

          <template #delete="{ item }">
            <wt-select
              :clearable="false"
              :disabled="!hasEditAccess"
              :options="accessOptions"
              :value="item.access.d"
              @input="changeDeleteAccessMode({ item, mode: $event })"
            />
          </template>
          <template #actions="{ item }">
            <wt-icon-action
              action="delete"
              @click="changeReadAccessMode({ item, mode: { id: accessMode.FORBIDDEN }})"
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
import { mapState } from 'vuex';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import permissionsTabMixin from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import RoleColumn from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-column.vue';
import RolePopup from '../../../../../../_shared/permissions-tab/components/permissions-tab-role-popup.vue';

const namespace = 'permissions/objects';
const subNamespace = 'obac';

export default {
  name: 'OpenedObjectPermissionsObac',
  components: { RolePopup, RoleColumn },
  mixins: [permissionsTabMixin],
  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
    });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
    headerTitle: '',
  }),
  computed: {
    ...mapState('permissions/objects', {
      id: (state) => state.itemId,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
