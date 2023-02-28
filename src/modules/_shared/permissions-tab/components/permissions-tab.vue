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
        :headers="headers"
        :grid-actions="!disableUserInput"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template v-slot:grantee="{ item }">
          <role-column :role="item.grantee"></role-column>
        </template>

        <template v-slot:read="{ item }">
          <wt-select
            :value="item.access.r"
            :options="accessOptions"
            :clearable="false"
            :disabled="disableUserInput"
            @input="changeReadAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template v-slot:edit="{ item }">
          <wt-select
            :value="item.access.w"
            :options="accessOptions"
            :clearable="false"
            :disabled="disableUserInput"
            @input="changeUpdateAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template v-slot:delete="{ item }">
          <wt-select
            :value="item.access.d"
            :options="accessOptions"
            :clearable="false"
            :disabled="disableUserInput"
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
import RoleColumn from './_internals/permissions-role-column.vue';
import RolePopup from './permissions-tab-role-popup.vue';
import permissionsTabMixin from '../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import openedTabComponentMixin from '../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

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
