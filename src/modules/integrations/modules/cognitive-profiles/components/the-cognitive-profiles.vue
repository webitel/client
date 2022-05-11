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
          <h3 class="content-title">{{ $t('objects.integrations.cognitiveProfiles.all') }}</h3>
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
            >
              <wt-icon-btn
                v-if="hasDeleteAccess"
                class="icon-action"
                :class="{'hidden': anySelected}"
                icon="bucket"
                :tooltip="actionPanelDeleteTooltip"
                @click="callDelete(selectedRows)"
              ></wt-icon-btn>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
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
            <template v-slot:default="{ item }">
              {{ item.default }}
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
        { name: this.$tc('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2), route: '/integrations/cognitive-profiles' },
      ];
    },
  },
};
</script>

<style scoped>

</style>
