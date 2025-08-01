<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header hide-primary>
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
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
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
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
          <wt-table
            :data="dataList"
            :headers="headers"
            :selectable="false"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.class }}
              </adm-item-link>
            </template>

            <template #obac="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess || item.rbac"
                :value="item.obac"
                @change="onObacToggled({ item, index, value: $event })"
              />
            </template>

            <template #rbac="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.rbac"
                @change="onRbacToggled({ item, index, value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasEditAccess"
                @click="edit(item)"
              />
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
          />
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
  name: 'TheObjectsPermissions',
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      hiddenText: true,
    });
    return { dummy };
  },
  data: () => ({
    namespace,
    routeName: RouteNames.OBJECTS,
  }),

  computed: {
    path() {
      const baseUrl = '/permissions/objects';
      return [
        {
          name: this.$t('objects.permissions.permissions'),
        },
        {
          name: this.$t('objects.permissions.object.object'),
          route: baseUrl,
        },
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

    async onRbacToggled({ item, index, value }) {
      const wasEnabled = item.rbac;

      await this.toggleObjectRbac({
        item,
        index,
        value,
      });

      if (!wasEnabled && value && !item.obac) {
        this.toggleObjectObac({
          item,
          index,
          value: true,
        });
      }
    },

    async onObacToggled({ item, index, value }) {
      if (item.rbac && value === false) return;

      await this.toggleObjectObac({
        item,
        index,
        value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
