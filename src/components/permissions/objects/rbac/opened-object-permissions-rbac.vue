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
      <div class="table-wrapper__scroll-wrapper">
        <wt-table
          :headers="headers"
          :data="dataList"
          :selectable="false"
          :grid-actions="false"
        >
          <template slot="grantor" slot-scope="{ item }">
            <div v-if="item.grantor">
              {{ item.grantor.name }}
            </div>
          </template>

          <template slot="grantee" slot-scope="{ item }">
            <div v-if="item.grantee">
              {{ item.grantee.name }}
            </div>
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

          <template slot="write" slot-scope="{ item }">
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
import RolePopup from './opened-object-permissions-rbac-role-popup.vue';
import permissionsTabMixin from '../../../../mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';

export default {
  name: 'opened-object-permissions-rbac',
  mixins: [permissionsTabMixin],
  components: { RolePopup },
  data: () => ({
    subNamespace: 'rbac',
    headerTitle: '',
  }),
  computed: {
    headers() {
      return [
        { value: 'grantor', text: this.$t('objects.permissions.object.grantor') },
        { value: 'grantee', text: this.$t('objects.permissions.object.grantee') },
        { value: 'read', text: this.$t('objects.read') },
        { value: 'write', text: this.$t('objects.edit') },
        { value: 'delete', text: this.$t('objects.delete') },
      ];
    },
  },
};

</script>

<style lang="scss" scoped>
</style>
