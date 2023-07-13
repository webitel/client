<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
      <create-cognitive-profile-popup
        v-if="isCognitiveProfilePopup"
        @close="isCognitiveProfilePopup = false"
      ></create-cognitive-profile-popup>
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
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          :show-action="dummy.showAction"
          @create="create"
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
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:provider="{ item }">
              {{ item.provider }}
            </template>
            <template v-slot:service="{ item }">
              {{ $t(`objects.${item.service.toLowerCase()}`) }}
            </template>
            <template v-slot:default="{ item, index }">
              <wt-radio
                :selected="item.default"
                :disabled="!item.enabled"
                :value="true"
                @input="changeDefaultProfile({ item, index, value: $event })"
              ></wt-radio>
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="changeState({ item, index, value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="callDelete(item)"
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
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import CreateCognitiveProfilePopup from './create-cognitive-profile-popup.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import dummyPic from '../assets/adm-dummy-cognitive-profiles.svg';

const namespace = 'integrations/cognitiveProfiles';

export default {
  name: 'the-cognitive-profiles',
  mixins: [tableComponentMixin],
  components: {
    CreateCognitiveProfilePopup,
  },
  data: () => ({
    namespace,
    routeName: RouteNames.COGNITIVE_PROFILES,
    isCognitiveProfilePopup: false,
  }),

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
      dummyPic,
      dummyText: 'objects.integrations.emptyWorkspace',
    });
    return { dummy };
  },

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
    create() {
      this.isCognitiveProfilePopup = true;
    },
    async changeDefaultProfile({ index, item, value }) {
      try {
        await this.patchItem({
          index, item, prop: 'default', value,
        });
        if (value) this.loadList();
      } catch {
        this.loadList();
      }
    },
    async changeState({ item, index, value }) {
      await this.patchItem({
        item, index, prop: 'enabled', value,
      });
      if (item.default && !value) {
        await this.changeDefaultProfile({ item, index, value: false });
      }
    },
  },
};
</script>

<style scoped>

</style>
