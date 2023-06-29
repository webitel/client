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
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="$t(dummy.text)"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :selectable="false"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.class }}
              </wt-item-link>
            </template>

            <template v-slot:obac="{ item, index }">
              <wt-switcher
                :value="item.obac"
                :disabled="!hasEditAccess"
                @change="toggleObjectObac({ item, index, value: $event })"
              ></wt-switcher>
            </template>

            <template v-slot:rbac="{ item, index }">
              <wt-switcher
                :value="item.rbac"
                :disabled="!hasEditAccess"
                @change="toggleObjectRbac({ item, index, value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
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
import { useDummy } from '../../../../../app/composables/useDummy';

const namespace = 'permissions/objects';

export default {
  name: 'the-objects-permissions',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace,
    routeName: RouteNames.OBJECTS,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, hiddenText: true });
    return { dummy };
  },

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
