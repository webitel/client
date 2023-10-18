<template>
  <section>
    <role-popup
      v-if="isRoleSelectPopup"
      :namespace="namespace"
      :sub-namespace="subNamespace"
      @close="closeRoleSelectPopup"
    ></role-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.permissions.object.operations') }}</h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="openRoleSelectPopup"
          ></wt-icon-btn>
        </wt-table-actions>
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
          <template v-slot:grantee="{ item }">
            <role-column :role="item.grantee"></role-column>
          </template>

          <template v-slot:read="{ item }">
            <wt-select
              :clearable="false"
              :disabled="disableUserInput"
              :options="accessOptions"
              :value="item.access.r"
              @input="changeReadAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template v-slot:edit="{ item }">
            <wt-select
              :clearable="false"
              :disabled="disableUserInput"
              :options="accessOptions"
              :value="item.access.w"
              @input="changeUpdateAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>

          <template v-slot:delete="{ item }">
            <wt-select
              :clearable="false"
              :disabled="disableUserInput"
              :options="accessOptions"
              :value="item.access.d"
              @input="changeDeleteAccessMode({ item, mode: $event })"
            ></wt-select>
          </template>
          <template v-slot:actions="{ item }">
            <wt-icon-action
              action="delete"
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
import openedTabComponentMixin
  from '../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import permissionsTabMixin from '../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import RoleColumn from './_internals/permissions-role-column.vue';
import RolePopup from './permissions-tab-role-popup.vue';

export default {
  name: 'permissions-tab',
  mixins: [openedTabComponentMixin, permissionsTabMixin],
  components: { RolePopup, RoleColumn },
  data: () => ({
    subNamespace: 'permissions',
  }),
};
</script>

<style lang="scss" scoped>
</style>
