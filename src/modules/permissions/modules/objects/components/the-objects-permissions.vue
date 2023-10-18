<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header hide-primary>
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
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
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
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
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            :selectable="false"
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
                :disabled="!hasEditAccess"
                :value="item.obac"
                @change="toggleObjectObac({ item, index, value: $event })"
              ></wt-switcher>
            </template>

            <template v-slot:rbac="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.rbac"
                @change="toggleObjectRbac({ item, index, value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
            </template>
          </wt-table>
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
  </wt-page-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

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
