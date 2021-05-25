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
        ></wt-table-actions>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="openRoleSelectPopup"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <div class="table-wrapper__scroll-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
        :grid-actions="!disableUserInput"
        :selectable="false"
        @sort="sort"
      >
        <template slot="grantee" slot-scope="{ item }">
          <div v-if="item.grantee" class="permissions-tab__role-column">
           <permissions-role-icon :user="item.grantee.user"></permissions-role-icon>
            {{ item.grantee.name }}
          </div>
        </template>

        <template slot="read" slot-scope="{ item }">
          <wt-select
            :value="item.access.r"
            :options="accessOptions"
            :clearable="false"
            :disabled="disableUserInput"
            @input="changeReadAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template slot="edit" slot-scope="{ item }">
          <wt-select
            :value="item.access.w"
            :options="accessOptions"
            :clearable="false"
            :disabled="disableUserInput"
            @input="changeUpdateAccessMode({ item, mode: $event })"
          ></wt-select>
        </template>

        <template slot="delete" slot-scope="{ item }">
          <wt-select
            :value="item.access.d"
            :options="accessOptions"
            :clearable="false"
            :disabled="disableUserInput"
            @input="changeDeleteAccessMode({ item, mode: $event })"
          ></wt-select>
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
import RolePopup from './permissions-tab-role-popup.vue';
import PermissionsRoleIcon from './permissions-role-icon.vue';
import permissionsTabMixin from '../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabMixin';
import openedTabComponentMixin from '../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'permissions-tab',
  mixins: [openedTabComponentMixin, permissionsTabMixin],
  components: { RolePopup, PermissionsRoleIcon },
  data: () => ({
    subNamespace: 'permissions',
  }),
};
</script>

<style lang="scss" scoped>
.permissions-tab__role-column {
  display: flex;
  align-items: center;
  .permissions-role-icon {
    margin-right: var(--component-spacing);
  }
}
</style>
