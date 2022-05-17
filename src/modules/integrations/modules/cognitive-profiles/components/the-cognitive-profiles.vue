<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
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
                { entity: $tc('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2) },
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
              <wt-icon-btn
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :tooltip="actionPanelDeleteTooltip"
                class="icon-action"
                icon="bucket"
                @click="callDelete(selectedRows)"
              ></wt-icon-btn>
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
              <item-link :link="itemLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template v-slot:provider="{ item }">
              {{ item.provider }}
            </template>
            <template v-slot:service="{ item }">
              {{ item.service }}
            </template>
            <template v-slot:default="{ item, index }">
              <wt-radio
                :value="true"
                :selected="item.default"
                @input="changeDefaultProfile({ item, index, value: $event })"
              ></wt-radio>
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="patchItem({ index, item, prop: 'enabled', value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
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
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-cognitive-profiles',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'integrations/cognitiveProfiles',
    routeName: RouteNames.COGNITIVE_PROFILES,
  }),

  computed: {
    path() {
      return [
        { name: this.$t('objects.integrations.integrations') },
        {
          name: this.$tc('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2),
          route: '/integrations/cognitive-profiles',
        },
      ];
    },
  },
  methods: {
    async changeDefaultProfile({ index, item, value }) {
      if (!item.default) {
        try {
          await this.patchItem({
            index, item, prop: 'default', value,
          });
        } finally {
          this.loadList();
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
