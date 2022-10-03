<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{
              $t(
                'objects.all',
                { entity: $tc('objects.integrations.triggers.triggers', 2) },
              )
            }}
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
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div v-show="isLoaded" class="table-wrapper">
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template v-slot:type="{ item }">
              {{ $t(`${TriggerTypes.find((type) => type.value === item.type).locale}`) }}
            </template>
            <template v-slot:schema="{ item }">
              <div
                v-if="item.schema"
              >{{ item.schema.name }}
              </div>
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="changeState({ item, index, value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-btn
                icon="trigger-start"
                icon-prefix="adm"
                @click="startTrigger(item)"
              ></wt-icon-btn>
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="callDelete(item)"
              ></delete-action>
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
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import TriggerTypes from '../lookups/TriggerTypes.lookup';

export default {
  name: 'the-triggers',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'integrations/triggers',
    routeName: RouteNames.TRIGGERS,
    TriggerTypes,
  }),
  computed: {
    path() {
      return [
        { name: this.$t('objects.integrations.integrations') },
        {
          name: this.$tc('objects.integrations.triggers.triggers', 2),
          route: '/integrations/triggers',
        },
      ];
    },
  },
  methods: {
    async changeState({ item, index, value }) {
      await this.patchItem({
        item, index, prop: 'enabled', value,
      });
    },
    ...mapActions({
      startTrigger(dispatch, payload) {
        return dispatch(`${this.namespace}/START_TRIGGER`, payload);
      },
    }),
  },
};
</script>

<style scoped>

</style>
