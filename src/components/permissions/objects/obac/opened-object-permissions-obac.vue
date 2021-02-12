<template>
  <section>
    <role-popup
      v-if="isRoleSelectPopup"
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
        ></wt-search-bar><wt-icon-btn
          class="icon-action"
          icon="refresh"
          :tooltip="$t('iconHints.reload')"
          @click="loadList"
        ></wt-icon-btn>
        <wt-icon-btn
          class="icon-action"
          icon="plus"
          :tooltip="$t('iconHints.add')"
          @click="openRoleSelectPopup"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <div class="table-wrapper__scroll-wrapper">
        <wt-table
        :headers="headers"
        :data="dataList"
        :selectable="false"
        :grid-actions="false"
      >
        <template slot="grantee" slot-scope="{ item }">
          <div v-if="item.grantee">
            {{ item.grantee.name }}
          </div>
        </template>

        <template slot="create" slot-scope="{ item }">
          <wt-select
            :value="item.access.x"
            :options="accessOptions"
            :clearable="false"
            @input="changeCreateAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template slot="read" slot-scope="{ item }">
          <wt-select
            :value="item.access.r"
            :options="accessOptions"
            :clearable="false"
            @input="changeReadAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template slot="edit" slot-scope="{ item }">
          <wt-select
            :value="item.access.w"
            :options="accessOptions"
            :clearable="false"
            @input="changeUpdateAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template slot="delete" slot-scope="{ item }">
          <wt-select
            :value="item.access.d"
            :options="accessOptions"
            :clearable="false"
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
import { mapState } from 'vuex';
import permissionsTabMixin from '../../../../mixins/permissionsTabMixin/permissionsTabMixin';
import RolePopup from './opened-object-permissions-obac-role-popup.vue';

export default {
  name: 'opened-object-permissions-obac',
  mixins: [permissionsTabMixin],
  components: { RolePopup },
  data: () => ({
    namespace: 'permissions/objects/obac',
    headerTitle: '',
  }),
  computed: {
    ...mapState('permissions/objects', {
      id: (state) => state.itemId,
    }),
    ...mapState('permissions/objects/obac', {
      dataListValue: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'grantee', text: this.$t('objects.permissions.object.grantee') },
        { value: 'create', text: this.$t('objects.create') },
        { value: 'read', text: this.$t('objects.read') },
        { value: 'edit', text: this.$t('objects.edit') },
        { value: 'delete', text: this.$t('objects.delete') },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
