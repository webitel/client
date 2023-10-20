<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="() => isConfigurationPopup = true"
        hide-secondary
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

  <template v-slot:main>
    <configuration-popup
      v-if="isConfigurationPopup"
      :id="id"
      :namespace="namespace"
      @close="isConfigurationPopup = false"
    ></configuration-popup>

      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{
              $t('objects.all', {
                entity: $tc('objects.system.configuration.configuration', 2).toLowerCase(),
              })
            }}
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
              >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          class="dummy-wrapper"
        />
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
            <template #name="{ item }">
              {{ item.name }}
            </template>
            <template #value="{ item }">
              {{ item.value }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="editParameter(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="callDelete(item)"
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
import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import ConfigurationPopup from './configuration-popup.vue';

const namespace = 'system/configuration';

export default {
  name: 'TheConfiguration',
  components: { ConfigurationPopup },
  mixins: [tableComponentMixin],
  setup() {
    const { dummy } = useDummy({ namespace });
    return { dummy };
  },
  data: () => ({
    namespace,
    isConfigurationPopup: false,
  }),
  computed: {
    ...mapState({
      id(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
    }),
    path() {
      return [
        { name: this.$t('objects.system.system') },
        { name: this.$tc('objects.system.configuration.configuration', 1), route: namespace },
      ];
    },
  },
  methods: {
    ...mapActions({
      setItemId(dispatch, payload) {
        return dispatch(`${namespace}/SET_ITEM_ID`, payload);
      },
    }),
    editParameter(item) {
      this.setItemId(item.id);
      this.isConfigurationPopup = true;
    },
  },
};
</script>
