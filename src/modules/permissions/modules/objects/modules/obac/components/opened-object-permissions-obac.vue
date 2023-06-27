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
        {{ $tc("objects.permissions.object.operations", 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @input="setSearch"
          @search="loadList"
          @enter="loadList"
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
        :headers="headers"
        :data="dataList"
        :selectable="false"
        :grid-actions="hasTableActions"
        sortable
        @sort="sort"
      >
        <template v-slot:grantee="{ item }">
          <role-column :role="item.grantee"></role-column>
        </template>

        <template v-slot:create="{ item }">
          <wt-select
            :value="item.access.x"
            :options="accessOptions"
            :clearable="false"
            :disabled="!hasEditAccess"
            @input="changeCreateAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template v-slot:read="{ item }">
          <wt-select
            :value="item.access.r"
            :options="accessOptions"
            :clearable="false"
            :disabled="!hasEditAccess"
            @input="changeReadAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template v-slot:edit="{ item }">
          <wt-select
            :value="item.access.w"
            :options="accessOptions"
            :clearable="false"
            :disabled="!hasEditAccess"
            @input="changeUpdateAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template v-slot:delete="{ item }">
          <wt-select
            :value="item.access.d"
            :options="accessOptions"
            :clearable="false"
            :disabled="!hasEditAccess"
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
import { mapState } from 'vuex';
import AddAction from '../../../../../../../app/components/actions/add-action';
import permissionsTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import RoleColumn from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-column.vue';
import RolePopup from '../../../../../../_shared/permissions-tab/components/permissions-tab-role-popup.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'permissions/objects';
const subNamespace = 'obac';

export default {
  name: 'opened-object-permissions-obac',
  mixins: [permissionsTabMixin],
  components: { AddAction, RolePopup, RoleColumn },
  data: () => ({
    namespace,
    subNamespace,
    headerTitle: '',
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}` });
    return { dummy };
  },
  computed: {
    ...mapState('permissions/objects', {
      id: (state) => state.itemId,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
