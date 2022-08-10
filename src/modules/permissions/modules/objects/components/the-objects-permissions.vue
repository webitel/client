<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header hide-primary>
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.permissions.object.allObjects') }}
          </h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :selectable="false"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="editLink(item)">
                {{ item.class }}
              </item-link>
            </template>

            <template slot="obac" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.obac"
                :disabled="!hasEditAccess"
                @change="toggleObjectObac({ item, index, value: $event })"
              ></wt-switcher>
            </template>

            <template slot="rbac" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.rbac"
                :disabled="!hasEditAccess"
                @change="toggleObjectRbac({ item, index, value: $event })"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item }">
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
              ></edit-action>
            </template>
          </wt-table>
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
  </wt-page-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-objects-permissions',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'permissions/objects',
    routeName: RouteNames.OBJECTS,
  }),

  computed: {
    hasTableActions() {
      return this.hasEditAccess;
    },
    path() {
      const baseUrl = '/permissions/objects';
      return [
        { name: this.$t('objects.permissions.permissions') },
        { name: this.$t('objects.permissions.object.object'), route: baseUrl },
      ];
    },
  },

  methods: {
    ...mapActions({
      toggleObjectObac(dispatch, payload) {
        return dispatch(`${this.namespace}/TOGGLE_OBJECT_OBAC`, payload);
      },
      toggleObjectRbac(dispatch, payload) {
        return dispatch(`${this.namespace}/TOGGLE_OBJECT_RBAC`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
